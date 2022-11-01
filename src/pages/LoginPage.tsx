import {LangSelectorComponent} from "../components/LangSelectorComponent";
import React from "react";
import {LoginComponent} from "../components/LoginComponent";

export function LoginPage() {
  return (
    <>
      <header className="app__header">
        <LangSelectorComponent/>
      </header>
      <div>
        <LoginComponent></LoginComponent>
      </div>
    </>
  )
}
