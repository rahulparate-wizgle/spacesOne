export function initCareerTabs() {
  return {
    activeTab: 'tab-1',
    switchTabs(e) {
      const target = e.target.getAttribute('data-tab');
      this.activeTab = target;
      //console.log(this.activeTab);
    }
  }
}

export function initJobTabs() {
  return {
    activeTab: 'all',
    switchTabs(e) {
      const target = e.target.getAttribute('data-tab');
      this.activeTab = target;
      //console.log(this.activeTab);
    }
  }
}