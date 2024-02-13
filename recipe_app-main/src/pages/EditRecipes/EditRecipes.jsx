import React, {useEffect, useState} from 'react';
import PageTemplate from "../PageTemplate/PageTemplate";
import {collection, addDoc, deleteDoc, doc, getDocs} from "firebase/firestore";
import {auth, db} from '../../utils/firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import "./editRecipes.css";

const Page = React.forwardRef((props, ref) => {

    const [user, loading, error] = useAuthState(auth);

    const removeRecipe = async (recipeId) => {
        try {
            await deleteDoc(doc(db, "recipes", recipeId));
            console.log("Document with ID: ", recipeId, " successfully deleted");
        } catch (error) {
            console.log(recipeId);
            console.error("Error removing document: ", error);
        }
    };

    return (
        <div className="demoPage" ref={ref} style={{flexDirection:"row", display: "flex"}}>
            { user.uid === props.children.userData &&
                <input type={"checkbox"} onChange={() => removeRecipe(props.children.id)}>{props.children.index}</input>}
            { user.uid === props.children.userData &&
                <p>{props.children.title}</p>
            }
        </div>
    );
});

const EditRecipes = () => {

    const [title, setTitle] = useState("")
    const [ingredients, setIngredients] = useState([{name: "", quantity: ""}])
    const [steps, setSteps] = useState([""])
    const [recipes, setRecipes] = useState([]);
    const [user, loading, error] = useAuthState(auth);


    const fetchPost = async () => {
        await getDocs(collection(db, "recipes"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id: doc.id}));
                setRecipes(newData);
                console.log(recipes, newData);
            })
    }

    useEffect(()=>{
        fetchPost();
    }, [])

    const handleIngredientNameChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index].name = event.target.value;
        setIngredients(newIngredients);
    };

    const handleIngredientQuantityChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index].quantity = event.target.value;
        setIngredients(newIngredients);
    };

    const handleStepChange = (index, event) => {
        const newSteps = [...steps];
        newSteps[index] = event.target.value;
        setSteps(newSteps);
    };

    const addNewIngredientInput = () => {
        setIngredients([...ingredients, { name: "", quantity: "" }]);
    };

    const resetIngredientInput = () => {
        setIngredients([{ name: "", quantity: "" }]);
    }

    const addNewStepInput = () => {
        setSteps([...steps, ""]);
    };

    const resetNewStepInput = () => {
        setSteps([""]);
    };

    const addRecipe = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "recipes"), {
                title: title,
                ingredients: ingredients,
                steps: steps,
                userData: user.uid

            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className={"RecipeBody"}>
            <PageTemplate>
            <div>
                <section className="recipe-container">
                    <div className="recipe">

                        <div className={"recipeBox"}>
                            <div>
                                <div className={"CreateRecipe"}>
                                    <h1>Add Recipe</h1>
                                    <br/>
                                    <h3>Enter recipe name:</h3>
                                    <input className={"InputBox"}
                                        type="text"
                                        placeholder=""
                                        onChange={(e)=>setTitle(e.target.value)}
                                    />
                                    <br/>


                                    <div className={"Ingredients"}>
                                        {ingredients.map((ingredient, index) => (
                                            <div key={index} className={"IngredientsAndQuantity"}>
                                                <h3>Ingredient:</h3>
                                                <input className={"InputBox"}
                                                    type="text"
                                                    placeholder=""
                                                    value={ingredient.name}
                                                    onChange={(e) => handleIngredientNameChange(index, e)}
                                                />
                                                <h3>Quantity:</h3>
                                                <input className={"InputBox"}
                                                    type="text"
                                                    placeholder=""
                                                    value={ingredient.quantity}
                                                    onChange={(e) => handleIngredientQuantityChange(index, e)}
                                                />
                                            </div>
                                        ))}
                                        <br/>
                                        <div className={"addReset"}>
                                            <button className={"button1"} onClick={addNewIngredientInput}>Add Ingredient</button>
                                            <button className={"button1"} onClick={resetIngredientInput}>Reset Ingredient</button>
                                        </div>
                                    </div>

                                    <br/>
                                    <div className={"Step"}>
                                        {steps.map((step, index) => (
                                            <div key={index} className={"StepStep"}>
                                                <h3>Step {index + 1}</h3>
                                                <input className={"InputBox"}
                                                    type="text"
                                                    placeholder=""
                                                    value={step}
                                                    onChange={(e) => handleStepChange(index, e)}
                                                />
                                            </div>
                                        ))}
                                        <br/>
                                        <div className={"addReset"}>
                                            <button className={"button1"} onClick={addNewStepInput}>Add Step</button>
                                            <button className={"button1"} onClick={resetNewStepInput}>Reset Step</button>
                                        </div>
                                    </div>
                                </div>
                                <br/>

                                <div className="btn-container">
                                    <button
                                        type="submit"
                                        className="btn"
                                        onClick={addRecipe}
                                    >
                                        Add Recipe
                                    </button>
                                </div>
                            </div>
                            <div className={"EraseRecipe"}>
                                <h1>Delete Recipes</h1>
                                <br/>
                                <div className={"DeleteRecipe"} >
                                    {
                                        recipes?.map((recipe ,index)=>(
                                            <Page number={index + 1} recipeName={recipe.title}>
                                                {recipe}
                                            </Page>
                                        ))
                                    }
                                </div>
                                <br/>

                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </PageTemplate>
        </div>
    );
};

export default EditRecipes;
