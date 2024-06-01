import { ImageSource, Sound, Resource, Loader } from 'excalibur';

const Resources = {
    Fish: new ImageSource('images/Gerrit.png'),
    Background: new ImageSource('images/bikini bottom 0.png'),
    Mario: new ImageSource('images/goomba.png'),
    MrFish: new ImageSource('images/MrFish.png'),
    Froakie: new ImageSource('images/656.png'),
    Mushroom: new ImageSource('images/platform.png'),
    Block: new ImageSource('images/block.png'),
    Door: new ImageSource('images/doha.png'),
    Key: new ImageSource('images/Key.png'),
    introScreen: new ImageSource('images/garyIntro1.png'),
    endScreen: new ImageSource('images/garyEndScreen.png'),
    coins: new ImageSource('images/coins.png')

    
};

const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.Background,
    Resources.Mario,
    Resources.MrFish,
    Resources.Froakie,
    Resources.Mushroom,
    Resources.Block,
    Resources.Door,
    Resources.Key,
    Resources.introScreen,
    Resources.endScreen,
    Resources.coins
]);

export { Resources, ResourceLoader }
