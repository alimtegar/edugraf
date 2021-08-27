import Achievement from './Achievement';

type AcquiredAchievement = {
    id: number,
    achievement_id: number,
    progress: number,
    achievement: Achievement
};

export default AcquiredAchievement;