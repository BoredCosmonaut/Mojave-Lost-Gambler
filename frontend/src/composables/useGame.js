import {ref,computed} from 'vue'
import * as gameService from '@/services/gameService'
import * as scoreService from '@/services/scoreService'

const total_rounds = 5;

export function useGame() {
    const round = ref(null);
    const roundIndex = ref(0);
    const totalScore = ref(0);
    const lastResult = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const topScores = ref([]);

    const isGameOver = computed(() =>
    roundIndex.value >= total_rounds
    );

    async function startRound() {
        loading.value = true;
        error.value = null;
        try {
            const data = await gameService.getRound();
            round.value = data;
            console.log(round.value.location.image_url)
            lastResult.value = null;
            roundIndex.value++;
        } catch (err) {
            error.value = err;
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    async function guessRound(actualX,actualY,guessX,guessY) {
        loading.value = true;
        try {
            console.log('guessRound called with:', { actualX, actualY, guessX, guessY });
            const res = await gameService.submitGuess({
                actualX: actualX,
                actualY:actualY,
                guessX:guessX,
                guessY:guessY
            });
            console.log('Distance:', res.data.distance);
            console.log('Score:', res.data.score);
            lastResult.value = {
                ...res.data,
                actual: { x: actualX, y: actualY }
            }
            totalScore.value += res.data.score;
        } catch (err) {
            error.value = err;
            console.error(err)
        } finally {
            loading.value = false;
        }
    }

    async function submitScore(name) {
        loading.value = true;
        console.log(totalScore.value);
        try {
            await scoreService.submitScore({
                player_name: name,
                score: totalScore.value
            });
        } catch (err) {
            error.value = err;
            console.error(err);
        } finally {
            loading.value = false;
        }
    }

    async function getTopScores() {
        loading.value = true;
        try {
            const res = await scoreService.getTopScores();
            
            if (res.scores && Array.isArray(res.scores)) {
                topScores.value = res.scores;
            } else if (res.scores) {
                topScores.value = [res.scores]; 
            } else {
                topScores.value = []; 
            }
            
            console.log("Processed Scores:", topScores.value);
        } catch (err) {
            error.value = err;
            topScores.value = []; 
            console.error(err);
        } finally {
            loading.value = false;
        }
    }

    return {round,roundIndex,totalScore,lastResult,loading,error,topScores,isGameOver,startRound,guessRound,submitScore,getTopScores}

}