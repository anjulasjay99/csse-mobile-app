const User = (function () {
  function UserInstance() {
    this.fullName = "";
    this.siteId = "";
    this.siteName = "";
    this.email = "";
    this.password = "";

    return {
      getFullName: () => {
        return this.fullName;
      },
      setFullName: (fullName) => {
        this.fullName = fullName;
      },
      getSiteId: () => {
        return this.siteId;
      },
      setSiteId: (siteId) => {
        this.siteId = siteId;
      },
      getSiteName: () => {
        return this.siteName;
      },
      setSiteName: (siteName) => {
        this.siteName = siteName;
      },
      getEmail: () => {
        return this.email;
      },
      setEmail: (email) => {
        this.email = email;
      },
      getPassword: () => {
        return this.password;
      },
      setPassword: (password) => {
        this.password = password;
      },
    };
  }

  let userInstance;

  //create a new user instance
  function createUserInstance() {
    userInstance = new UserInstance();
    return userInstance;
  }

  return {
    getUserInstance: () => {
      if (!userInstance) {
        userInstance = createUserInstance();
      }
      return userInstance;
    },
    destroy: () => {
      userInstance = null;
    },
  };
})();

module.exports = User;
