import {ref,computed} from 'vue'
import * as gameService from '@/services/gameService'
import * as scoreService from '@/services/scoreService'
import { useRoute } from 'vue-router'
const total_rounds = 3;
const totalScore = ref(0);
const activeRegion = ref('');
export function useGame() {
    const round = ref(null);
    const roundIndex = ref(0);
    const lastResult = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const topScores = ref([]);
    const route = useRoute();
    if (route?.params?.zone) {
        activeRegion.value = route.params.zone;
    }
    const currentRegion = computed(() => route.params.zone);
    const isGameOver = computed(() =>
    roundIndex.value >= total_rounds
    );

    async function startRound() {
        loading.value = true;
        error.value = null;
        try {
            const data = await gameService.getRound(currentRegion.value);
            round.value = data;
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
            const res = await gameService.submitGuess({
                actualX: actualX,
                actualY:actualY,
                guessX:guessX,
                guessY:guessY
            });
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
        try {
            await scoreService.submitScore({
                player_name: name,
                score: totalScore.value,
                region: activeRegion.value
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