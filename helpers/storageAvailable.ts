export const checkStorageEnabled = () => {
    try {
      const key = `__storage__test`;
      localStorage.setItem(key, "");
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  };
  