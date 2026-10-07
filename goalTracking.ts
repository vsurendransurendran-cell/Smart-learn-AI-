/**
 * Utility functions for Daily Study Goal tracking and completion logic.
 * Resets to 0 and gradually increments upon quiz, stage, or topic completion.
 */

export interface GoalProgressUpdate {
  minutes: number;
  topics: number;
  goalsCompleted: number;
}

export function recordGoalProgress(topicsDelta: number = 1, minutesDelta: number = 10): GoalProgressUpdate {
  try {
    const todayStr = new Date().toISOString().split('T')[0];
    const savedDate = localStorage.getItem('smartlearn_daily_goal_date');

    let currMinutes = 0;
    let currTopics = 0;

    if (savedDate === todayStr) {
      currMinutes = Number(localStorage.getItem('smartlearn_daily_current_minutes') || 0);
      currTopics = Number(localStorage.getItem('smartlearn_daily_current_topics') || 0);
    }

    const newMinutes = currMinutes + minutesDelta;
    const newTopics = currTopics + topicsDelta;

    localStorage.setItem('smartlearn_daily_goal_date', todayStr);
    localStorage.setItem('smartlearn_daily_current_minutes', String(newMinutes));
    localStorage.setItem('smartlearn_daily_current_topics', String(newTopics));

    const targetMin = Number(localStorage.getItem('smartlearn_daily_target_minutes') || 30);
    const targetTop = Number(localStorage.getItem('smartlearn_daily_target_topics') || 3);
    const goalType = localStorage.getItem('smartlearn_daily_goal_type') || 'minutes';

    let totalGoals = Number(localStorage.getItem('smartlearn_goals_completed') || 0);
    const wasReached = goalType === 'minutes' ? currMinutes >= targetMin : currTopics >= targetTop;
    const nowReached = goalType === 'minutes' ? newMinutes >= targetMin : newTopics >= targetTop;

    // Gradually increment goalsCompleted by 1 upon crossing goal threshold
    if (!wasReached && nowReached) {
      totalGoals += 1;
      localStorage.setItem('smartlearn_goals_completed', String(totalGoals));
    }

    const update: GoalProgressUpdate = {
      minutes: newMinutes,
      topics: newTopics,
      goalsCompleted: totalGoals
    };

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('smartlearn:goal-progress', { detail: update }));
    }

    return update;
  } catch (err) {
    console.error('Failed to record goal progress', err);
    return {
      minutes: minutesDelta,
      topics: topicsDelta,
      goalsCompleted: 0
    };
  }
}

export function resetDailyGoalsToZero(): GoalProgressUpdate {
  const todayStr = new Date().toISOString().split('T')[0];
  try {
    localStorage.setItem('smartlearn_daily_goal_date', todayStr);
    localStorage.setItem('smartlearn_daily_current_minutes', '0');
    localStorage.setItem('smartlearn_daily_current_topics', '0');
    localStorage.setItem('smartlearn_goals_completed', '0');

    const update: GoalProgressUpdate = {
      minutes: 0,
      topics: 0,
      goalsCompleted: 0
    };

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('smartlearn:goal-progress', { detail: update }));
    }

    return update;
  } catch (err) {
    console.error('Failed to reset daily goals', err);
    return { minutes: 0, topics: 0, goalsCompleted: 0 };
  }
}
