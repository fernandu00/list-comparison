import { parse } from "papaparse";
import React, { useState } from "react";
import { UserContext } from "../App";
import { CSVLink } from "react-csv";
import { useContext } from "react";
import {
  FaSistrix,
  FaArrowCircleDown,
  FaExchangeAlt,
  FaRegFileAlt,
  FaRegFileCode,
} from "react-icons/fa";

const ListComparison = () => {
  const { isAuth, username, setUsername } = useContext(UserContext);
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
      <h1 className="title">Limpa listas</h1>
      <div className="container">
        <article className="element">
          <h2>Lista de contatos</h2>
          <label className="custom-label" htmlFor="list">
            <FaRegFileAlt />
            Contatos
          </label>
          <input onChange={handleList} name="list" id="list" type="file" />
        </article>
        <article className="element">
          <h2>Lista Não perturbe</h2>
          <label className="custom-label" htmlFor="blacklist">
            <FaRegFileCode /> Blacklist
          </label>
          <input
            onChange={handleBlackList}
            name="blacklist"
            id="blacklist"
            type="file"
          />
        </article>
      </div>
      <div className="compare">
        <button onClick={compareLists}>
          <FaExchangeAlt /> compare
        </button>
      </div>
      <div>
        {finalResult.length > 0 && (
          <h3 className="apagados">
            Foram apagados {listLength - finalListLength} nomes
          </h3>
        )}

        <div>
          <CSVLink
            data={finalResult}
            filename={"lista_limpa.csv"}
            target="_blank"
          >
            <button className="download-link">
              download
              <FaArrowCircleDown />
            </button>
          </CSVLink>
        </div>
      </div>
    </main>
  );
};

export default ListComparison;
