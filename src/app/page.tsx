import Image from "next/image";
import styles from "./page.module.css";
import QuestionnaireForm from "./components/questionnaire";
import FormQuestion from "./components/form"
import Only from "./components/onlyform"
import Re from "./components/Refactor"


export default function Home() {
  return (
    <div >
      <FormQuestion />

    </div>
  );
}
