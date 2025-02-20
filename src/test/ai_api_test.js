async function main() {
  const response = await fetch("http://localhost:3000/api/suggest-messages", {
    method: "POST",
  });
  const data = await response.json();
  const questions =
    data.response.candidates[0].content.parts[0].text.split("||");

  console.log( questions);
}

main();
// .then(data => {
//   const questions = data.response.candidates[0].content.parts[0].text.split("||");
//   console.log("Extracted questions:");
//   questions.forEach((question, index) => {
//     console.log(`${index + 1}. ${question}`);
//   });
// });
