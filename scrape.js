years = [...document.querySelector(".tab-content").children];
const data = {
  firstYear: {},
  secondYear: {},
  thirdYear: {},
  fourthYear: {},
};

const yearsIndex = ["firstYear", "secondYear", "thirdYear", "fourthYear"];

const subjectMap = (subject) => {
  const name = subject.textContent.replace("\n", "").trim();
  const link = subject.querySelector("a")?.getAttribute("href");
  return {
    name,
    link,
  };
};

years.forEach((y, index) => {
  const firstHalf = (data[yearsIndex[index]]["firstHalf"] = {});
  const secondHalf = (data[yearsIndex[index]]["secondHalf"] = null);
  firstHalf["sem"] = null;
  firstHalf["subject"] = [...y.querySelectorAll(".card-body")].map(subjectMap);

  //   firstHalf["sem"] = y.children[0].textContent;
  //   firstHalf["subject"] = [...y.children[1].querySelectorAll(".card-body")].map(
  //     subjectMap
  //   );

  //   secondHalf["sem"] = y.children[3].textContent;
  //   secondHalf["subject"] = [...y.children[4].querySelectorAll(".card-body")].map(
  //     subjectMap
  //   );
});
