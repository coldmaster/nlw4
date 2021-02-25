import {createContext, useState, ReactNode, useEffect} from 'react';
import challenges from '../../challenges.json';

 interface Challenge{
     type: 'eye' | 'body';
     description: string;
     amount: number;
 }

 interface ChallengeContextData{
    level: number;
    currentExperience: number; 
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge:Challenge;
    levelUP: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
 }

 interface ChallengesContextProvider {
     children: ReactNode;
 }

 export const ChallengesContext = createContext({} as ChallengeContextData)

 export function ChallengeProvider({children}:ChallengesContextProvider){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0); 

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(()=>{
        Notification.requestPermission();
    },[])

    function levelUP(){
      setLevel(1 + level);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('novo desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUP();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return(
        <ChallengesContext.Provider 
        value={{
            level, 
            currentExperience, 
            challengesCompleted,
            activeChallenge,
            experienceToNextLevel,
            completeChallenge,
            levelUP,
            startNewChallenge,
            resetChallenge}}>
            {children}
        </ChallengesContext.Provider>
    );
 }