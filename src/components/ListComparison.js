import { parse } from "papaparse";
import React, { useState } from "react";
import _, { includes } from "lodash";
import { CSVDownload, CSVLink } from "react-csv";

const ListComparison = () => {
  const [list, setList] = useState([]);
  const [blackList, setBlackList] = useState([]);
  const [cleanList, setCleanList] = useState([]);
  const [listLength, setListLength] = useState("");
  const [finalListLength, setFinalListLength] = useState("");
  const [finalResult, setFinalResult] = useState("");

  const handleList = (e) => {
    const file = e.target.files[0];
    parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => setList(result.data),
    });
  };

  const handleBlackList = (e) => {
    const file = e.target.files[0];
    parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => setBlackList(result.data),
    });
  };

  //   compares both lists and creates another list without the blacklisted names
  const compareLists = () => {
    // converts arrays of objects in simple arrays to check the names later
    const newList = list.map((person) => person.nome);
    const newBlack = blackList.map((person) => person.nome);

    // receives an array and checks if some argument is not included
    const checkincludes = (arr, p) => !arr.includes(p);
    // creates a new list without the names blacklisted
    const finalList = newList.filter((person) =>
      checkincludes(newBlack, person)
    );

    // // recreates an array of objects to compare later
    // let newCleaned = [];
    // finalList.forEach((item) => {
    //   const person = new Object();
    //   person.nome = item;
    //   newCleaned.push(person);
    // });

    // iterate over the original list and filters the names from the cleaned list
    const endResult = list.filter(({ nome }) =>
      finalList.some((e) => e === nome)
    );
    setFinalResult(endResult);
    console.log(endResult);

    //     const finalList = list.filter(
    //       (person) person.nome !blackList.includes(person.nome)
    //     );
    //     setCleanList(finalList);
    //     console.log(finalList);
    //   };

    //   const compareLists = () => {
    //     const removedList = removeId(list);
    //     const removedBlack = removeId(blackList);
    //     console.log(removedList);
    //     console.log(removedBlack);
    //     const finalList = removedList.filter(
    //       (person) => !removedBlack.includes(person)
    //     );

    setListLength(list.length);
    setFinalListLength(endResult.length);
  };
  return (
    <main className="list-main">
      <div className="container">
        <h1 className="title">Limpa listas</h1>
        <div>
          <h2>Escolha o arquivo desejado</h2>
          <label className="custom-label" htmlFor="list">
            Lista de contatos
          </label>
          <input onChange={handleList} name="list" id="list" type="file" />
        </div>
        <div>
          <h2>Escolha o arquivo a ser filtrado</h2>
          <label className="custom-label" htmlFor="blacklist">
            Lista Negra
          </label>
          <input
            onChange={handleBlackList}
            name="blacklist"
            id="blacklist"
            type="file"
          />
        </div>
      </div>
      <div className="compare">
        <button onClick={compareLists}>compare as listas</button>
      </div>
      <div>
        {finalResult.length > 0 && (
          <h3 className="apagados">
            Foram apagados {listLength - finalListLength} nomes
          </h3>
        )}

        <div>
          <CSVLink data={finalResult} target="_blank">
            <button className="download-link">download</button>
          </CSVLink>
        </div>
      </div>
    </main>
  );
};

export default ListComparison;
