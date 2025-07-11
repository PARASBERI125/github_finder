let btn = document.querySelector("button");
let username;
btn.addEventListener("click", function (e) {
  e.preventDefault();
  username = document.getElementById("usernameinput").value.trim();
  fetchUserProfile(username).then((data) => {
    document.getElementById("url").innerText = "GITHUB LINK - " + data.html_url;

    document.getElementById("url").href = data.html_url;

    document.getElementById("name").innerHTML = "NAME - " + data.name;
    document.getElementById("avatar").src = data.avatar_url;
    document.getElementById("repos").innerHTML =
      "PUBLIC REPOS - " + data.public_repos;

    document.getElementById("profileCard").classList.remove("animate-pulse");

    document.getElementById("name").classList.remove("hidden");
    document.getElementById("url").classList.remove("hidden");
    document.getElementById("repos").classList.remove("hidden");
    document.getElementById("avatar").classList.remove("hidden");

    document.getElementById("name-shimmer").remove();
    document.getElementById("url-shimmer").remove();
    document.getElementById("repos-shimmer").remove();
  });
});

async function fetchUserProfile(username) {
  return await fetch(`https://api.github.com/users/${username}`)
    .then((data) => {
      if (!data.ok) {
        throw new Error("User not found"); //yahin rok do aur bahar niklo,agar ye nahi likhege toh github khud 404 error deke handle karlega aur fir hum user not found vala message nahi dikha payege
      }
      return data.json();
    })

    .catch((error) => {
      console.error("Error fetching user profile:", error);
      document.getElementById("profileCard").classList.add("animate-pulse");
      document.getElementById("name").innerHTML = "User not found";
      document.getElementById("url").classList.add("hidden");
      document.getElementById("repos").classList.add("hidden");
      document.getElementById("avatar").classList.add("hidden");
    });
}
