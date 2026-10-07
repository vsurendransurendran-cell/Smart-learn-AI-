import { dbManager } from './db.js';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  age: number;
  mobile_number?: string;
  role: string;
  avatar?: string;
  target_exam?: string;
  target_job_role?: string;
  daily_goal_minutes: number;
  preferred_language: string;
  created_at?: string;
  updated_at?: string;
}

export class Repository {
  /**
   * Safe parameterized user lookup by email
   */
  async findUserByEmail(email: string): Promise<UserRecord | null> {
    const normalizedEmail = email.trim().toLowerCase();

    if (dbManager.isUsingMySQL()) {
      const rows = await dbManager.execute(
        'SELECT * FROM users WHERE LOWER(email) = ? LIMIT 1',
        [normalizedEmail]
      );
      return rows && rows.length > 0 ? rows[0] : null;
    }

    // In-memory fallback
    for (const user of dbManager.inMemStore.users.values()) {
      if (user.email.toLowerCase() === normalizedEmail) {
        return user;
      }
    }
    return null;
  }

  /**
   * Safe parameterized user lookup by ID
   */
  async findUserById(id: string): Promise<UserRecord | null> {
    if (dbManager.isUsingMySQL()) {
      const rows = await dbManager.execute(
        'SELECT * FROM users WHERE id = ? LIMIT 1',
        [id]
      );
      return rows && rows.length > 0 ? rows[0] : null;
    }

    return dbManager.inMemStore.users.get(id) || null;
  }

  /**
   * Safe parameterized user creation with bcrypt hashed password
   */
  async createUser(user: UserRecord): Promise<UserRecord> {
    const createdAt = new Date().toISOString();
    const userToSave = { ...user, created_at: createdAt };

    if (dbManager.isUsingMySQL()) {
      await dbManager.execute(
        `INSERT INTO users (id, name, email, password_hash, age, mobile_number, role, avatar, target_exam, target_job_role, daily_goal_minutes, preferred_language)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          user.id,
          user.name,
          user.email.toLowerCase(),
          user.password_hash,
          user.age || 20,
          user.mobile_number || null,
          user.role || 'student',
          user.avatar || null,
          user.target_exam || null,
          user.target_job_role || null,
          user.daily_goal_minutes || 30,
          user.preferred_language || 'en'
        ]
      );

      // Initialize default user stats
      await dbManager.execute(
        `INSERT INTO user_stats (user_id, total_assessments, total_questions_answered, correct_answers, overall_score_percentage, study_streak_days, total_xp, current_level, level_title, xp_to_next_level)
         VALUES (?, 0, 0, 0, 0, 0, 0, 1, 'Novice Scholar', 100)
         ON DUPLICATE KEY UPDATE user_id = user_id`,
        [user.id]
      );

      return userToSave;
    }

    // In-memory fallback
    dbManager.inMemStore.users.set(user.id, userToSave);
    dbManager.inMemStore.userStats.set(user.id, {
      totalAssessments: 0,
      totalQuestionsAnswered: 0,
      correctAnswers: 0,
      overallScorePercentage: 0,
      studyStreakDays: 0,
      totalXp: 0,
      currentLevel: 1,
      levelTitle: 'Novice Scholar',
      xpToNextLevel: 100,
      booksReadCount: 0,
      pagesReadCount: 0,
      weakTopicsCount: 0,
      needsImprovementCount: 0,
      strongTopicsCount: 0
    });

    return userToSave;
  }

  /**
   * Update user password hash securely
   */
  async updateUserPassword(id: string, newPasswordHash: string): Promise<boolean> {
    const existing = await this.findUserById(id);
    if (!existing) return false;

    if (dbManager.isUsingMySQL()) {
      await dbManager.execute(
        `UPDATE users SET password_hash = ? WHERE id = ?`,
        [newPasswordHash, id]
      );
    } else {
      existing.password_hash = newPasswordHash;
      dbManager.inMemStore.users.set(id, existing);
    }
    return true;
  }

  /**
   * Update student profile securely
   */
  async updateUser(id: string, updates: Partial<UserRecord>): Promise<UserRecord | null> {
    const existing = await this.findUserById(id);
    if (!existing) return null;

    const merged = { ...existing, ...updates };

    if (dbManager.isUsingMySQL()) {
      await dbManager.execute(
        `UPDATE users SET name = ?, age = ?, target_exam = ?, target_job_role = ?, daily_goal_minutes = ?, preferred_language = ?, avatar = ? WHERE id = ?`,
        [
          merged.name,
          merged.age,
          merged.target_exam || null,
          merged.target_job_role || null,
          merged.daily_goal_minutes,
          merged.preferred_language,
          merged.avatar || null,
          id
        ]
      );
    } else {
      dbManager.inMemStore.users.set(id, merged);
    }

    return merged;
  }

  /**
   * Save assessment record
   */
  async saveAssessment(userId: string, record: any): Promise<void> {
    if (dbManager.isUsingMySQL()) {
      await dbManager.execute(
        `INSERT INTO assessments (id, user_id, assessment_id, title, type, subject_name, questions_json, student_answers_json, score, total_questions, percentage, status, time_spent_seconds)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          record.id,
          userId,
          record.assessmentId,
          record.title,
          record.type,
          record.subjectName,
          JSON.stringify(record.questions),
          JSON.stringify(record.studentAnswers),
          record.score,
          record.totalQuestions,
          record.percentage,
          record.status,
          record.timeSpentSeconds || 0
        ]
      );
    } else {
      const userAssessments = dbManager.inMemStore.assessments.get(userId) || [];
      userAssessments.unshift(record);
      dbManager.inMemStore.assessments.set(userId, userAssessments);
    }
  }

  /**
   * Get user assessment history
   */
  async getAssessments(userId: string, limit: number = 20): Promise<any[]> {
    if (dbManager.isUsingMySQL()) {
      const rows = await dbManager.execute(
        'SELECT * FROM assessments WHERE user_id = ? ORDER BY completed_at DESC LIMIT ?',
        [userId, limit]
      );
      return (rows || []).map((r: any) => ({
        ...r,
        questions: typeof r.questions_json === 'string' ? JSON.parse(r.questions_json) : r.questions_json,
        studentAnswers: typeof r.student_answers_json === 'string' ? JSON.parse(r.student_answers_json) : r.student_answers_json
      }));
    }

    const list = dbManager.inMemStore.assessments.get(userId) || [];
    return list.slice(0, limit);
  }

  /**
   * Save topic performance record
   */
  async saveTopicPerformance(userId: string, topicRecord: any): Promise<void> {
    if (dbManager.isUsingMySQL()) {
      await dbManager.execute(
        `INSERT INTO topic_performance (id, user_id, topic_id, topic_name, subject_id, subject_name, correct_count, total_count, percentage, status, attempts)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
           correct_count = VALUES(correct_count),
           total_count = VALUES(total_count),
           percentage = VALUES(percentage),
           status = VALUES(status),
           attempts = attempts + 1,
           last_assessed_at = CURRENT_TIMESTAMP`,
        [
          `tp-${userId}-${topicRecord.topicId}`,
          userId,
          topicRecord.topicId,
          topicRecord.topicName,
          topicRecord.subjectId,
          topicRecord.subjectName,
          topicRecord.correct,
          topicRecord.total,
          topicRecord.percentage,
          topicRecord.status,
          1
        ]
      );
    } else {
      const map = dbManager.inMemStore.topicPerformance.get(userId) || {};
      map[topicRecord.topicId] = {
        ...topicRecord,
        attempts: (map[topicRecord.topicId]?.attempts || 0) + 1,
        lastAssessedAt: new Date().toISOString()
      };
      dbManager.inMemStore.topicPerformance.set(userId, map);
    }
  }

  /**
   * Get topic performance map for user
   */
  async getTopicPerformance(userId: string): Promise<Record<string, any>> {
    if (dbManager.isUsingMySQL()) {
      const rows = await dbManager.execute(
        'SELECT * FROM topic_performance WHERE user_id = ?',
        [userId]
      );
      const res: Record<string, any> = {};
      (rows || []).forEach((r: any) => {
        res[r.topic_id] = {
          topicId: r.topic_id,
          topicName: r.topic_name,
          subjectId: r.subject_id,
          subjectName: r.subject_name,
          correct: r.correct_count,
          total: r.total_count,
          percentage: r.percentage,
          status: r.status,
          attempts: r.attempts,
          lastAssessedAt: r.last_assessed_at
        };
      });
      return res;
    }

    return dbManager.inMemStore.topicPerformance.get(userId) || {};
  }

  /**
   * User Stats
   */
  async getUserStats(userId: string): Promise<any> {
    if (dbManager.isUsingMySQL()) {
      const rows = await dbManager.execute(
        'SELECT * FROM user_stats WHERE user_id = ? LIMIT 1',
        [userId]
      );
      if (rows && rows.length > 0) {
        const r = rows[0];
        return {
          totalAssessments: r.total_assessments,
          totalQuestionsAnswered: r.total_questions_answered,
          correctAnswers: r.correct_answers,
          overallScorePercentage: r.overall_score_percentage,
          studyStreakDays: r.study_streak_days,
          totalXp: r.total_xp,
          currentLevel: r.current_level,
          levelTitle: r.level_title,
          xpToNextLevel: r.xp_to_next_level,
          booksReadCount: r.books_read_count,
          pagesReadCount: r.pages_read_count,
          weakTopicsCount: r.weak_topics_count,
          needsImprovementCount: r.needs_improvement_count,
          strongTopicsCount: r.strong_topics_count
        };
      }
    }

    return dbManager.inMemStore.userStats.get(userId) || {
      totalAssessments: 0,
      totalQuestionsAnswered: 0,
      correctAnswers: 0,
      overallScorePercentage: 0,
      studyStreakDays: 0,
      totalXp: 0,
      currentLevel: 1,
      levelTitle: 'Novice Scholar',
      xpToNextLevel: 100,
      booksReadCount: 0,
      pagesReadCount: 0,
      weakTopicsCount: 0,
      needsImprovementCount: 0,
      strongTopicsCount: 0
    };
  }

  async updateUserStats(userId: string, stats: any): Promise<void> {
    if (dbManager.isUsingMySQL()) {
      await dbManager.execute(
        `INSERT INTO user_stats (user_id, total_assessments, total_questions_answered, correct_answers, overall_score_percentage, study_streak_days, total_xp, current_level, level_title, xp_to_next_level, books_read_count, pages_read_count, weak_topics_count, needs_improvement_count, strong_topics_count)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
           total_assessments = VALUES(total_assessments),
           total_questions_answered = VALUES(total_questions_answered),
           correct_answers = VALUES(correct_answers),
           overall_score_percentage = VALUES(overall_score_percentage),
           study_streak_days = VALUES(study_streak_days),
           total_xp = VALUES(total_xp),
           current_level = VALUES(current_level),
           level_title = VALUES(level_title),
           xp_to_next_level = VALUES(xp_to_next_level),
           books_read_count = VALUES(books_read_count),
           pages_read_count = VALUES(pages_read_count),
           weak_topics_count = VALUES(weak_topics_count),
           needs_improvement_count = VALUES(needs_improvement_count),
           strong_topics_count = VALUES(strong_topics_count)`,
        [
          userId,
          stats.totalAssessments || 0,
          stats.totalQuestionsAnswered || 0,
          stats.correctAnswers || 0,
          stats.overallScorePercentage || 0,
          stats.studyStreakDays || 0,
          stats.totalXp || 0,
          stats.currentLevel || 1,
          stats.levelTitle || 'Novice Scholar',
          stats.xpToNextLevel || 100,
          stats.booksReadCount || 0,
          stats.pagesReadCount || 0,
          stats.weakTopicsCount || 0,
          stats.needsImprovementCount || 0,
          stats.strongTopicsCount || 0
        ]
      );
    } else {
      dbManager.inMemStore.userStats.set(userId, stats);
    }
  }

  /**
   * Record book page read
   */
  async recordBookPageRead(userId: string, bookId: string, pageNumber: number): Promise<{ readPages: number[]; totalPagesRead: number }> {
    if (dbManager.isUsingMySQL()) {
      await dbManager.execute(
        `INSERT IGNORE INTO library_progress (id, user_id, book_id, page_number) VALUES (?, ?, ?, ?)`,
        [`lib-${userId}-${bookId}-${pageNumber}`, userId, bookId, pageNumber]
      );

      const rows = await dbManager.execute(
        'SELECT page_number FROM library_progress WHERE user_id = ? AND book_id = ?',
        [userId, bookId]
      );
      const readPages = (rows || []).map((r: any) => r.page_number);

      const totalRows = await dbManager.execute(
        'SELECT COUNT(*) as count FROM library_progress WHERE user_id = ?',
        [userId]
      );
      const totalPagesRead = totalRows && totalRows[0] ? totalRows[0].count : readPages.length;

      return { readPages, totalPagesRead };
    }

    // In-memory fallback
    const userLib = dbManager.inMemStore.libraryProgress.get(userId) || {};
    const bookPages = userLib[bookId] || [];
    if (!bookPages.includes(pageNumber)) {
      bookPages.push(pageNumber);
      userLib[bookId] = bookPages;
      dbManager.inMemStore.libraryProgress.set(userId, userLib);
    }

    let totalPagesRead = 0;
    Object.values(userLib).forEach((pages: any) => {
      totalPagesRead += pages.length;
    });

    return { readPages: bookPages, totalPagesRead };
  }

  async getLibraryReadPages(userId: string): Promise<Record<string, number[]>> {
    if (dbManager.isUsingMySQL()) {
      const rows = await dbManager.execute(
        'SELECT book_id, page_number FROM library_progress WHERE user_id = ?',
        [userId]
      );
      const res: Record<string, number[]> = {};
      (rows || []).forEach((r: any) => {
        if (!res[r.book_id]) res[r.book_id] = [];
        res[r.book_id].push(r.page_number);
      });
      return res;
    }

    return dbManager.inMemStore.libraryProgress.get(userId) || {};
  }
}

export const repo = new Repository();
