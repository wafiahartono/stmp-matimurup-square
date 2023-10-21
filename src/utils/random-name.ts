const adjectives = ["Gorgeous", "Vibrant", "Mysterious", "Spectacular", "Enchanting", "Radiant", "Whimsical", "Luminous", "Serene", "Majestic", "Tranquil", "Captivating", "Dazzling", "Ethereal", "Mesmerizing", "Breathtaking", "Exquisite", "Splendid", "Picturesque", "Astonishing", "Awe-inspiring", "Alluring", "Enigmatic", "Fascinating", "Stunning"];

const animals = ["Alligator", "Anteater", "Armadillo", "Auroch", "Axolotl", "Badger", "Bat", "Beaver", "Buffalo", "Camel", "Capybara", "Chameleon", "Cheetah", "Chinchilla", "Chipmunk", "Chupacabra", "Cormorant", "Coyote", "Crow", "Dingo", "Dinosaur", "Dog", "Dolphin", "Dragon", "Duck", "Dumbo Octopus", "Elephant", "Ferret", "Fox", "Frog", "Giraffe", "Gopher", "Grizzly", "Hedgehog", "Hippo", "Hyena", "Jackal", "Ibex", "Ifrit", "Iguana", "Koala", "Kraken", "Lemur", "Leopard", "Liger", "Lion", "Llama", "Manatee", "Mink", "Monkey", "Narwhal", "Nyan Cat", "Orangutan", "Otter", "Panda", "Penguin", "Platypus", "Pumpkin", "Python", "Quagga", "Rabbit", "Raccoon", "Rhino", "Sheep", "Shrew", "Skunk", "Slow Loris", "Squirrel", "Tiger", "Turtle", "Unicorn", "Walrus", "Wolf", "Wolverine", "Wombat"];

export default function () {
  return adjectives[Math.floor(Math.random() * adjectives.length)] +
    " " +
    animals[Math.floor(Math.random() * animals.length)]
}
