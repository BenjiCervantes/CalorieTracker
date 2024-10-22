
import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { ActivityReducer, InitialState } from './reducers/activity-reducer';
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {

  const [state, dispatch] = useReducer(ActivityReducer, InitialState);

  useEffect(()=> { 
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = () => useMemo(()=> state.activities.length > 0, [state.activities])
  return (
    <>
      <header className="bg-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-xl font-bold text-white uppercase">Contador de calorías</h1>
          <button 
            className="disabled:opacity-20 bg-lime-600 hover:bg-lime-700 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm"
            disabled={ !canRestartApp() }
            onClick={ () => dispatch( { type:'reset-app' } ) }>
            Reiniciar App</button>
        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          ></Form>
        </div>
      </section>
      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker
            activities={state.activities}
            >

            </CalorieTracker>
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        ></ActivityList>
      </section>
      <footer>
        <h2 className="bg-gray-800 p-2 text-center text-white text-2xl">Acerca de</h2>
        <p className="p-5 mx-auto max-w-4xl text-justify">
          Este proyecto fue creado utilizando React, TypeScript y Vue.js. Se utilizaron componentes, states, reducers y local storage.
          </p>
      </footer>
    </>
  )
}

export default App
