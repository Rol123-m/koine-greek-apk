import { createContext, useContext, useState, useEffect } from 'react';
import { checkAchievements } from './achievements';

// Mock users data - ahora con persistencia en localStorage
const getMockUsers = () => {
  const savedUsers = localStorage.getItem('mockUsers');
  if (savedUsers) {
    return JSON.parse(savedUsers);
  }
  
  // Usuarios por defecto
  const defaultUsers = [
    {
      id: 1,
      email: 'estudiante@ejemplo.com',
      password: 'password123',
      name: 'Ana Estudiante',
      role: 'student'
    },
    {
      id: 2,
      email: 'profesor@ejemplo.com',
      password: 'password123',
      name: 'Juan Profesor',
      role: 'professor'
    }
  ];
  
  localStorage.setItem('mockUsers', JSON.stringify(defaultUsers));
  return defaultUsers;
};

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mockUsers, setMockUsers] = useState(getMockUsers());

  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('currentUser');
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const saveMockUsers = (users) => {
    setMockUsers(users);
    localStorage.setItem('mockUsers', JSON.stringify(users));
  };

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (user) {
          const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          };

          if (user.role === 'student') {
            const savedProgress = localStorage.getItem(`userProgress_${user.id}`);
            userData.progress = savedProgress ? JSON.parse(savedProgress) : {
              xp: 0,
              streak: 0,
              level: 1,
              completedWeeks: [],
              weekProgress: {}
            };
          }

          setCurrentUser(userData);
          localStorage.setItem('currentUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Credenciales incorrectas'));
        }
      }, 500);
    });
  };

  const register = async (email, password, name, role = 'student') => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
          reject(new Error('El usuario ya existe'));
          return;
        }

        const newUser = {
          id: Math.max(...mockUsers.map(u => u.id)) + 1,
          email: email,
          password: password,
          name: name,
          role: role
        };

        if (role === 'student') {
          newUser.progress = {
            xp: 0,
            streak: 0,
            level: 1,
            completedWeeks: [],
            weekProgress: {}
          };
        }

        const updatedUsers = [...mockUsers, newUser];
        saveMockUsers(updatedUsers);

        const userData = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          progress: newUser.progress
        };

        setCurrentUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        if (role === 'student') {
          localStorage.setItem(`userProgress_${newUser.id}`, JSON.stringify(newUser.progress));
        }

        resolve(userData);
      }, 500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUserProgress = (week, correct, total) => {
    if (!currentUser || currentUser.role !== 'student') return;

    const currentProgress = currentUser.progress || {
      xp: 0,
      streak: 0,
      level: 1,
      completedWeeks: [],
      weekProgress: {}
    };

    const newXp = currentProgress.xp + (correct * 10);
    const newStreak = currentProgress.streak + 1;
    const newLevel = Math.floor(newXp / 100) + 1;

    const updatedProgress = {
      ...currentProgress,
      xp: newXp,
      streak: newStreak,
      level: newLevel,
      completedWeeks: currentProgress.completedWeeks.includes(week)
        ? currentProgress.completedWeeks
        : [...currentProgress.completedWeeks, week],
      weekProgress: {
        ...currentProgress.weekProgress,
        [week]: { correct: correct, total: total }
      }
    };

    const updatedUser = {
      ...currentUser,
      progress: updatedProgress
    };

    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    localStorage.setItem(`userProgress_${currentUser.id}`, JSON.stringify(updatedProgress));
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateUserProgress
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        <div>Cargando...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// ... (el resto del código permanece igual)

const register = async (email, password, name, role = 'student') => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        reject(new Error('El usuario ya existe'));
        return;
      }

      const newUser = {
        id: Math.max(...mockUsers.map(u => u.id)) + 1,
        email: email,
        password: password,
        name: name,
        role: role
      };

      if (role === 'student') {
        newUser.progress = {
          xp: 0,
          streak: 0,
          level: 1,
          completedWeeks: [],
          weekProgress: {},
          achievements: [] // Nuevo: array para logros desbloqueados
        };
      }

      const updatedUsers = [...mockUsers, newUser];
      saveMockUsers(updatedUsers);

      const userData = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        progress: newUser.progress
      };

      setCurrentUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      if (role === 'student') {
        localStorage.setItem(`userProgress_${newUser.id}`, JSON.stringify(newUser.progress));
      }

      resolve(userData);
    }, 500);
  });
};

const updateUserProgress = (week, correct, total) => {
  if (!currentUser || currentUser.role !== 'student') return;

  const currentProgress = currentUser.progress || {
    xp: 0,
    streak: 0,
    level: 1,
    completedWeeks: [],
    weekProgress: {},
    achievements: []
  };

  const newXp = currentProgress.xp + (correct * 10);
  const newStreak = currentProgress.streak + 1;
  const newLevel = Math.floor(newXp / 100) + 1;

  // Verificar logros desbloqueados
  const userForAchievements = {
    ...currentUser,
    progress: {
      ...currentProgress,
      xp: newXp,
      streak: newStreak,
      level: newLevel
    }
  };
  
  const unlockedAchievements = checkAchievements(userForAchievements);
  const newAchievements = [...new Set([...currentProgress.achievements, ...unlockedAchievements.map(a => a.id)])];

  const updatedProgress = {
    ...currentProgress,
    xp: newXp,
    streak: newStreak,
    level: newLevel,
    achievements: newAchievements,
    completedWeeks: currentProgress.completedWeeks.includes(week)
      ? currentProgress.completedWeeks
      : [...currentProgress.completedWeeks, week],
    weekProgress: {
      ...currentProgress.weekProgress,
      [week]: { correct: correct, total: total }
    }
  };

  const updatedUser = {
    ...currentUser,
    progress: updatedProgress
  };

  setCurrentUser(updatedUser);
  localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  localStorage.setItem(`userProgress_${currentUser.id}`, JSON.stringify(updatedProgress));

  // Mostrar notificación de nuevos logros
  if (unlockedAchievements.length > currentProgress.achievements.length) {
    showNewAchievements(unlockedAchievements.filter(a => !currentProgress.achievements.includes(a.id)));
  }
};

// Función para mostrar notificación de logros
const showNewAchievements = (achievements) => {
  achievements.forEach((achievement, index) => {
    setTimeout(() => {
      const achievementPopup = document.createElement('div');
      achievementPopup.className = 'achievement-popup';
      achievementPopup.innerHTML = `
        <div class="achievement-popup-content">
          <div class="achievement-icon">${achievement.icon}</div>
          <div class="achievement-text">
            <h3>¡Logro Desbloqueado!</h3>
            <p><strong>${achievement.name}</strong></p>
            <p>${achievement.description}</p>
          </div>
        </div>
      `;
      document.body.appendChild(achievementPopup);

      setTimeout(() => {
        achievementPopup.classList.add('show');
      }, 100);

      setTimeout(() => {
        achievementPopup.classList.remove('show');
        setTimeout(() => {
          if (achievementPopup.parentNode) {
            achievementPopup.remove();
          }
        }, 500);
      }, 4000);
    }, index * 500);
  });
};