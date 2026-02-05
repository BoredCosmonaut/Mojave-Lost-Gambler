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
    const topScores = ref(null)

    const isGameOver = computed(() =>
    roundIndex.value >= total_rounds
    );

    async function startRound() {
        loading.value = true;
        error.value = null;
        try {
            const {data} = await gameService.getRound();
            round.value = data;
            lastResult.value = null;
        } catch (err) {
            error.value = err;
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    async function guessRound(actualX,actualY) {
        loading.value = true;
        try {
            const {data} = await gameService.submitGuess({
                actualX: actualX,
                actualY:actualY,
                guessX:guessX,
                guessY:guessY
            });

            lastResult.value = data;
            totalScore.value += data.score;
            roundIndex.value++;
        } catch (err) {
            error.value = err;
            console.error(err)
        } finally {
            loading.value = false;
        }
    }

    async function submitScore(name) {
        loading.value = true;
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
            const {data} = await scoreService.getTopScores();
            topScores.value = data
        } catch (err) {
            error.value = err;
            console.error(err);
        } finally {
            loading.value = false;
        }
    }

    return {round,roundIndex,totalScore,lastResult,loading,error,topScores,isGameOver,startRound,guessRound,submitScore,getTopScores}

}