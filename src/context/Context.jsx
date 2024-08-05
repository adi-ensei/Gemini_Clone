import { createContext, useState } from "react";
import run from "../assets/config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const processResponse = (response) => {
    let responseArray = response.split("**");
    let formattedResponse = responseArray
      .map((segment, index) =>
        index % 2 === 0 ? segment : `<b>${segment}</b>`
      )
      .join("");

    let formattedResponse2 = formattedResponse.split("*").join("<br/>");
    let newResponseArray = formattedResponse2.split(" ");

    newResponseArray.forEach((nextWord, i) => delayPara(i, nextWord + " "));
  };

  const onSent = async () => {
    setResultData(""); // Reset result data before starting new process
    setLoading(true);
    setShowResult(true);

    try {
      const response = await run(input);
      setRecentPrompt(input);
      setPrevPrompt((prev) => [...prev, input]);
      processResponse(response);
    } catch (error) {
      console.error("Error fetching response:", error);
      setResultData("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    input,
    setInput,
    resultData,
    setResultData,
    // Define newChat function if needed or remove from contextValue
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
