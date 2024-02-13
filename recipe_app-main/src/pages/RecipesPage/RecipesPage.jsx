import React, {useEffect, useState} from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import HTMLFlipBook from "react-pageflip";
import { collection, getDocs } from "firebase/firestore";
import {db} from '../../utils/firebase';
import "./recipepage.css";

const PageCover = React.forwardRef((props, ref) => {
    return (
        <div className="page page-cover" ref={ref} data-density="hard">
            <div className="page-content">
                <h2>{props.children}</h2>
            </div>
        </div>
    );
});

const Page = React.forwardRef((props, ref) => {

    console.log(props);
      return (
        <div className="page" ref={ref}>
            <div className="page-content">
                <h1 className="page-header">{props.children.title}</h1>
                <p className="page-text">Ingredients: {props.children.ingredients.map(item => item.name + " "+ item.quantity).join(", ")}</p>
                <p className="page-text">Steps: {props.children.steps.join(', ')}</p>
                <br/>
                <p className="page-footer">Page number: {props.number +1}</p>
            </div>
        </div>
      );
});

const RecipesPage = () => {

    const [recipes, setRecipes] = useState([]);

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

    return (
    <PageTemplate>
        <div>
          <HTMLFlipBook
              width={350}
              height={400}
              // drawShadow
              // autoSize
              maxShadowOpacity={0.5}
              // showCover={true}

              className="demo-book"
          >
              {/*<PageCover>Recipes</PageCover>*/}
              {
                  recipes?.map((recipe ,index)=>(
                      <Page key={index} number={index + 1}>
                          {recipe}
                      </Page>
                  ))
              }
              {/*<PageCover>The End</PageCover>*/}
          </HTMLFlipBook>
        </div>
    </PageTemplate>
  );
};

export default RecipesPage;
