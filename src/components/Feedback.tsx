import React, { useContext, useState } from "react";

const FeedbackForm: React.FC = () => {
  const [feedback, setFeedback] = useState("");
  const [sending, setSending] = useState(false);
  const [feedbackPlaceHolder, setFeedbackPlaceHolder] =
    useState("Anonymous Feedback");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    try {
      const response = await fetch(
        "https://livexchange.netlify.app/api/feedbacks",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ feedback }),
        }
      );
      if (response.ok) {
        setFeedback("");
        setFeedbackPlaceHolder("Thank you for your feedback!");
      } else {
        console.error("Error submitting feedback:", response.statusText);
        setFeedback("");
        setFeedbackPlaceHolder(
          "Error submitting feedback, please thy again later"
        );
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setFeedback("");
      setFeedbackPlaceHolder(
        "Error submitting feedback, please thy again later"
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form
        className="border border-gray-400 bg-white rounded flex w-[302px] h-[130px] flex-col items-end relative"
        onSubmit={handleSubmit}
      >
        {sending ? (
          <div className="absolute bg-blue-100 top-3 left-3 right-3">
            <p>Sending...</p>
          </div>
        ) : (
          <></>
        )}
        <textarea
          className=" w-full p-3 placeholder-black"
          id="feedback"
          name="feedback"
          rows={5}
          value={feedback}
          onChange={(event) => setFeedback(event.target.value)}
          required
          placeholder={feedbackPlaceHolder}
        ></textarea>
        <button
          className="absolute bottom-3 right-3 inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-gray-600 hover:text-gray-600 hover:bg-white mt-4 lg:mt-0 w-baseL items-end"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
