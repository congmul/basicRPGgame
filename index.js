let user01;
let level01;
let charName = "";
let userNameIdEl = document.getElementById('userNameId');
let profession = document.getElementById('characters');
charName = profession.options[profession.selectedIndex].value;

function selectingChar() {
    profession = document.getElementById('characters')
    console.log(profession);
    charName = profession.options[profession.selectedIndex].value;
    console.log(charName);
    document.getElementById("characterImg").setAttribute("src", "./assets/img/" + charName + ".png");
}


function BasicRPG(name, profession, age, strength, hitPoints) {
    this.name = name;
    this.profession = profession;
    this.age = age;
    this.strength = strength;
    this.hitPoints = hitPoints;
}


BasicRPG.prototype = {
    printStats: function () {
        console.log("Name : " + this.name);
        console.log("Profession : " + this.profession);
        console.log("Age : " + this.age);
        console.log("Strength : " + this.strength);
        console.log("Hit Points : " + this.hitPoints);
        console.log();
    },

    isAlive: function () {
        if (this.hitPoints <= 0) {
            return false;
        } return true;
    },
    attack: function (enemyHp) {
        return enemyHp - this.strength;
    },
    levelUp: function () {
        this.age += 1;
        this.strength += 5;
        this.hitPoints += 25;
    }
}


// User CharacterData
const characterData = {
    babarian: {
        strength: 50,
        hitpoints: 150
    },
    necromancer: {
        strength: 30,
        hitpoints: 190
    },
    wizard: {
        strength: 10,
        hitpoints: 250
    },
    demonHunter: {
        strength: 70,
        hitpoints: 130
    }
}

// User Enemy Data
const enemyData = {
    slime: {
        level: 1,
        strength: 10,
        hitpoints: 80
    },
    troll: {
        level: 2,
        strength: 20,
        hitpoints: 120
    }
}
let confirmBtn = document.getElementById('confirmBtn');
confirmBtn.addEventListener("click", function (e) {
    e.preventDefault();
    // console.log(userNameIdEl.value);
    document.getElementById('initialScreen').setAttribute("class", "noneDisplay");
    document.getElementById('fightScreen').setAttribute("class", "blockDisplay");

    if (userNameIdEl.value === "") {
        alert("Enter user name");
        return;
    }
    switch (charName) {
        case 'barbarian':
            user01 = new BasicRPG(userNameIdEl.value, 'Babarian', 1, characterData.babarian.strength, characterData.babarian.hitpoints);
            break;
        case 'necromancer':
            user01 = new BasicRPG(userNameIdEl.value, 'Necromancer', 1, characterData.necromancer.strength, characterData.necromancer.hitpoints);
            break;
        case 'wizard':
            user01 = new BasicRPG(userNameIdEl.value, 'Wizard', 1, characterData.wizard.strength, characterData.wizard.hitpoints);
            break;
        case 'demonhunter':
            user01 = new BasicRPG(userNameIdEl.value, 'Demon Hunter', 1, characterData.demonHunter.strength, characterData.demonHunter.hitpoints);
            break;
    }

    level01 = new BasicRPG('Slime', 'slime', enemyData.slime.level, enemyData.slime.strength, enemyData.slime.hitpoints);

    document.getElementById('characterImg_fightScreen').setAttribute("src", "./assets/img/" + charName + ".png");
    document.getElementById('characterName_fightScreen').textContent = user01.name;
    document.getElementById('enemyName_fightScreen').textContent = level01.name;
    document.getElementById('hp_fightScreen').textContent = user01.hitPoints;
    document.getElementById('enemyhp_fightScreen').textContent = level01.hitPoints;
    document.getElementById('strenth_fightScreen').textContent = user01.strength;
    document.getElementById('enemystrenth_fightScreen').textContent = level01.strength;
    document.getElementById('level_fightScreen').textContent = user01.age;
    document.getElementById('enemylevel_fightScreen').textContent = level01.age;
    user01.printStats();
});

document.getElementById('userAttack').addEventListener("click", function (e) {
    e.preventDefault();

    document.getElementById('versusImg').setAttribute("src","./assets/img/attackImg.png");
    level01.hitPoints = user01.attack(level01.hitPoints);
    document.getElementById('enemyhp_fightScreen').textContent = level01.hitPoints;
    if (!level01.isAlive()) {
        alert('You win!!');
        return;
    }

    setTimeout(function () {
        alert(level01.name +" turn");
        document.getElementById('versusImg').setAttribute("src","./assets/img/versus.png");
        user01.hitPoints = level01.attack(user01.hitPoints);
        document.getElementById('hp_fightScreen').textContent = user01.hitPoints;
        if (!user01.isAlive()) {
            alert('You loose!!');
            return;
        }
    }, 1000);
});

document.getElementById('userLevelUp').addEventListener("click", function (e) {
    e.preventDefault();
    user01.levelUp();

    document.getElementById('hp_fightScreen').textContent = user01.hitPoints;
    document.getElementById('strenth_fightScreen').textContent = user01.strength;
    document.getElementById('level_fightScreen').textContent = user01.age;
});

// user01.printStats();
// level01.printStats();