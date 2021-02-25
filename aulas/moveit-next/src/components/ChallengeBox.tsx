import { useContext } from "react";
import { ChallengesContext } from "../context/ChallengesContext";
import { CountdownContext } from "../context/CountdownContext";

import styles from "../styles/components/ChallengeBox.module.css";

export function ChallengeBox(){
    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext);
    const {resetCountdown} = useContext(CountdownContext)

    function handleChallengeSucceedd(){
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }

    return(
        <div className={styles.challengeBoxContainer}>
           {activeChallenge ? (
               <div className={styles.challengeActive}>
                   <header>Ganhe {activeChallenge.amount}</header>

                   <main>
                       <img src={`icons/${activeChallenge.type}.svg`} alt="image"/>
                       <strong>Novo Desafio</strong>
                       <p>{activeChallenge.description}</p>
                   </main>

                   <footer>
                       <button 
                       type="button"
                       className={styles.challengeFailedButton}
                       onClick={handleChallengeFailed}
                       >
                           Falhei
                        </button>

                       <button 
                       type="button"
                       className={styles.challengeSuccessededButton}
                       onClick={handleChallengeSucceedd}
                       >
                           Completei
                        </button>
                   </footer>
               </div>
           ) :(
                <div className={styles.challengeNotActive}>
                    <strong> Finalize um ciclo para receber os desafios </strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level up"/>
                        Avance de level completando desafios
                    </p>
                </div>
           )}
        </div>
    )
}