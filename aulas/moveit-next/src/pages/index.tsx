import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import {CompleteChallenges} from "../components/CompleteChallenges"

import styles from '../styles/pages/Home.module.css'
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../context/CountdownContext";

export default function Home() {
  return (
    <div className={styles.container}>
        

          <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
               <Profile />
               <CompleteChallenges />
               <Countdown />
            </div>
            <div>
               <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
    </div>
  )
}
