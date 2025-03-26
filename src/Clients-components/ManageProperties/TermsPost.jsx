import { useState, useEffect } from "react";
import { AiOutlineRobot } from "react-icons/ai";

export default function TermsPost() {
  const [text, setText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Load stored text from localStorage on component mount
  useEffect(() => {
    const savedText = localStorage.getItem("pg_terms_text");
    if (savedText) setText(savedText);
  }, []);

  // Save text to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("pg_terms_text", text);
  }, [text]);

  return (
    <div className="max-w-xl mx-auto bg-white p-4">
      <label className="block text-gray-700 text-sm mb-2">
        Mentions PG's terms and conditions
      </label>
      <textarea
        className="w-full h-40 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center mt-2 text-gray-500 text-sm">
        <AiOutlineRobot className="mr-2" />
        Write with AI
      </div>
      <button
        className="w-full mt-4 bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-500"
        disabled={!text.trim()}
        onClick={() => setShowPopup(true)}
      >
        POST
      </button>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed  inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg text-center">
            <img
              src="https://s3-alpha-sig.figma.com/img/282a/0a63/a732d1b6f14349ed8054c7a4cf3d87be?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XO9LUWDINmMpESgHYlGC1d5MNWwyIGVHwgHEadRCkzfvSLEdZJnjdyoh8q6q6akfTYj7f9ZH2VsjPUC4~gBoXJx71Rbd-hCnJU28m9CxR69IiOgPDqgLtCxzFjqc~tGv7gRVF7nHXdLRABkLkcgOkx5f-V~zlQO541Ya1ifjvmYa84CuX91wGU4pHLz2TyMizk8erKzdLZINDO-ntOD1C1HGO9uodzXvRB7kQfjtfVdL~vgL8hcwrQOyHL2vQsknvN7rTUhyknYIcSja2Pzpej~l3ExsVyIqASrtY0Nna2j8-b9bdTggZojMhmm0EqGgVFWW5xW50hCOHJngKt631g__"
              alt="Success"
              className="mx-auto mb-4"
            />
            <p className="text-gray-700 font-medium">
              You have successfully listed your property.
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
