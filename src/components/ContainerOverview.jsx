import React from "react";
import ContainerSealForm from "./ContainerSealForm";
import products from "../products/products.json";
import ContainerPreview from "./ContainerPreview";

const ContainerOverview = ({ containerDetails, update, finish }) => {
  const { containerContent } = containerDetails;
  console.log("content: ", containerContent);
  const flatContainer = containerContent
    .reduce((flattened, stackObj) => {
      flattened.push(stackObj.content);
      return flattened;
    }, [])
    .flat(1);

  console.log(flatContainer);

  const baleCount = flatContainer.reduce((tallyObj, bale) => {
    if (!tallyObj[bale]) {
      tallyObj[bale] = 1;
    } else if (!!tallyObj[bale]) {
      tallyObj[bale] += 1;
    }
    return tallyObj;
  }, {});

  const braCount = flatContainer.filter(bale => bale === "BRA");

  const containerWeight = flatContainer.reduce((netWeight, bale) => {
    return (netWeight += products[bale].size);
  }, 0);
  
  const baleCountArray = Object.entries(baleCount);

  const smallBales = flatContainer.filter(bale => {
    return products[bale].baleSize === "small";
  });

  const bigBales = flatContainer.filter(bale => {
    return products[bale].baleSize === "big";
  });

  return (
    <div id="overview" className="App__view">
      <ContainerSealForm
        update={update}
        finish={finish}
        containerDetails={containerDetails}
      />

      <div id="overview__bale-count">
        {baleCountArray.map((bale, index) => {
          return (
            <p key={index}>
              <span>{bale[0]}: </span>
              <span> </span>
              <span>{bale[1]}</span>
            </p>
          );
        })}
      </div>
      <ContainerPreview container={containerContent} />
    </div>
  );
};

export default ContainerOverview;
