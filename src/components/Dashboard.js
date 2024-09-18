import React, { useState } from "react";

export default function Dashboard() {
  const [storyDescription, setStoryDescription] = useState("");

  const [characters, setCharacters] = useState("");
  const [idea, setIdea] = useState("");
  const [numPanels, setNumPanels] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(storyDescription);
    setIsCopied(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    const res = await fetch("/api/returnJobDescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        characters,
        idea,
        numPanels,
      }),
    });
    setIsGenerating(false);
    const data = await res.json();
    setStoryDescription(data.storyDescription.trim());
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-12 ">
        <div className="">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col">
              <div className="flex mt-10 items-center space-x-3">
                         <div
            style={{ backgroundColor: '#1A6292'}}
            className="rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm">
            {1}
        </div>
                        <p className="text-left font-medium flex align-center">
                            {"Characters"} 
                        </p>
                    </div>
              <input
                type="text"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="characters"
                placeholder="Characters"
                id="characters"
                value={characters}
                onChange={(e) => setCharacters(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="idea" className="sr-only">
                Idea
              </label>
              <input
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                placeholder="Idea"
                type="text"
                name="idea"
                id="idea"
              />
            </div>
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="tone">
                Number of Panels
              </label>

              <select
                value={numPanels}
                onChange={(e) => setNumPanels(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="numPanels"
                id="numPanels"
              >
                <option value="default">Select Number of Panels</option>
                <option value="four">four</option>
                <option value="five">five</option>
                <option value="six">six</option>
                <option value="seven">seven</option>
                <option value="eight">eight</option>
                <option value="nine">nine</option>  
              </select>
            </div>
            
            <button
              className={`bg-blue-600 w-full hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded
                ${
                  isGenerating || characters === "" || idea === "" || numPanels === ""
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              type="submit"
              disabled={isGenerating || characters === "" || idea === "" || numPanels === ""}
            >
              {isGenerating ? "Generating..." : "Generate Story Description"}
            </button>
          </form>
        </div>
        <div className="">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>
            <textarea
              rows={
                storyDescription === ""
                  ? 7
                  : storyDescription.split("\n").length + 12
              }
              name="output"
              value={storyDescription}
              onChange={(e) => setStoryDescription(e.target.value)}
              disabled={storyDescription === ""}
              id="output"
              placeholder="AI Generated Story Description"
              className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
            />
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={storyDescription === ""}
            >
              {isCopied ? "Copied" : "Copy to Clipboard"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
