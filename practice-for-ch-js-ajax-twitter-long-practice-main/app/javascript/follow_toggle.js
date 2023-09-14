import { API, broadcast } from "./util";

export default class FollowToggle {
  constructor(toggleButton) {
    this.toggleButton = toggleButton;
    toggleButton.addEventListener("click", this.handleClick.bind(this))
  }

  async handleClick(event) {
    event.preventDefault();
    if (this.followState === "followed") this.unfollow();
    else this.follow();
  }

  async follow() {
    const userId = this.toggleButton.dataset.userId
    this.followState = "following"
    await API.followUser(userId)
    this.followState = "followed"
  }

  async unfollow() {
    const userId = this.toggleButton.dataset.userId
    this.followState = "unfollowing"
    await API.unfollowUser(userId)
    this.followState = "unfollowed"
  }

  render() {
    switch (this.followState) {
      case "followed":
        this.toggleButton.innerText = "Unfollow!"
        this.toggleButton.disabled = null
        break;
      case "unfollowed":
        this.toggleButton.innerText = "Follow!"
        this.toggleButton.disabled = null
        break;
      case "following":
        this.toggleButton.innerText = "Following..."
        this.toggleButton.disabled = "disabled"
        break;
      case "unfollowing":
        this.toggleButton.innerText = "Unfollowing..."
        this.toggleButton.disabled = "disabled"
        break;
    }
  }

  get followState() {
    return this.toggleButton.dataset.followState;
  }

  set followState(newState) {
    this.toggleButton.dataset.followState = newState;
    console.log('test')
    this.render();
    
  }
}