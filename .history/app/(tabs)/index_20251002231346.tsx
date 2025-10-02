// app/(tabs)/index.tsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground, TextInput, Image, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Ellipse } from 'react-native-svg';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// Planet Details Component
const PlanetDetails = ({ visible, planet, onClose, onEnter }) => {
  if (!planet) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.closeButton1} onPress={onClose}>
              <Ionicons name='arrow-back' size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          <Image source={{ uri: planet.image }} style={styles.modalPlanetImage} />
          <Text style={styles.modalPlanetName}>{planet.name}</Text>
          <Text style={styles.modalPlanetDescription}>{planet.description}</Text>
          
          <TouchableOpacity 
            style={styles.enterButton}
            onPress={() => onEnter(planet)}
          >
            <Text style={styles.enterButtonText}>Enter {planet.name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Arrow Tag Component
const ArrowTag = ({ name, icon, onPress, position }) => {
  return (
    <TouchableOpacity 
      style={[styles.arrowTagContainer, position]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.arrowTagText}>{icon} {name}</Text>
        <Ionicons name="open-outline" size={18} color="black" style={{ marginLeft: 6 }} />
      </View>
      <View style={styles.arrow} />
    </TouchableOpacity>
  );
};

export default function Home() {
  const router = useRouter();
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showTag, setShowTag] = useState(null);

  // Planet data - Only 4 planets
  const planets = {
    amorFly: {
      name: "Amor Fly",
      image: "https://i.ibb.co/HJq3fHn/b969e9f64c34074a42fc914fb4fc67212e21a210.png",
      description: "Discover amazing places perfect for solo travelers. Find peace and adventure on your own terms.",
      icon: "🛫"
    },
    amorStreak: {
      name: "Amor Streak",
      image: "https://i.ibb.co/HJq3fHn/b969e9f64c34074a42fc914fb4fc67212e21a210.png",
      description: "Explore secret locations known only to locals. Off-the-beaten-path adventures await.",
      icon: "🔥"
    },
    litScore: {
      name: "Lit Score",
      image: "https://i.ibb.co/HJq3fHn/b969e9f64c34074a42fc914fb4fc67212e21a210.png",
      description: "Romantic destinations for couples. Create unforgettable memories with your partner.",
      icon: "💘"
    },
    loneTown: {
      name: "Lone Town",
      image: "https://i.ibb.co/HJq3fHn/b969e9f64c34074a42fc914fb4fc67212e21a210.png",
      description: "Unique dating experiences in extraordinary settings. Perfect for first dates or anniversaries.",
      icon: "🌆"
    },
  };

  // Star data
  const stars = {
    datesInStars: {
      name: "Dates in Stars",
      image: "https://i.ibb.co/nVtw0hQ/Screenshot-2025-08-24-230907-removebg-preview.png",
      description: "Romantic date ideas written in the stars",
      icon: "✨"
    },
    earnXP: {
      name: "Earn XP",
      image: "https://i.ibb.co/nVtw0hQ/Screenshot-2025-08-24-230907-removebg-preview.png",
      description: "Complete challenges to earn experience points",
      icon: "⭐"
    }
  };

  const handlePlanetPress = (planetKey) => {
    setSelectedPlanet(planets[planetKey]);
    setShowTag(planetKey);
  };

  const handleStarPress = (starKey) => {
    setSelectedPlanet(stars[starKey]);
    setShowTag(starKey);
  };

  const handleTagPress = (itemKey, type) => {
    if (type === 'planet') {
      setSelectedPlanet(planets[itemKey]);
    } else {
      setSelectedPlanet(stars[itemKey]);
    }
    setModalVisible(true);
    setShowTag(null);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleEnterPlanet = (planet) => {
    setModalVisible(false);
    
    // Navigate to the respective tab based on planet name
    switch(planet.name) {
      case "Amor Fly":
        router.push('/(tabs)/amorFly');
        break;
      case "Amor Streak":
        router.push('/(tabs)/amorStreak');
        break;
      case "Lit Score":
        router.push('/(tabs)/litscore');
        break;
      case "Lone Town":
        router.push('/(tabs)/lonetown');
        break;
      default:
        console.log('Unknown planet:', planet.name);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <ImageBackground 
          source={{ uri: 'https://i.ibb.co/kV5QknDR/2ce45e46d9227b923966a63de02db7d479400288.jpg' }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            {/* Search Input */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Enter a New World"
                placeholderTextColor="white"
              />
            </View>

            {/* Ellipses in background */}
            <Svg height="500" width="500" style={styles.ellipseSvg}>
              <Ellipse
                cx="220"
                cy="230"
                rx="110"
                ry="90"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.5"
                fill="none"
              />
            </Svg>
            <Svg height="550" width="550" style={styles.ellipseSvg2}>
              <Ellipse
                cx="160"
                cy="170"
                rx="220"
                ry="130"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.5"
                fill="none"
              />
            </Svg>

            {/* Central Planet */}
            <View style={styles.earthbg}>
              <Image 
                source={{ uri: 'https://i.ibb.co/7JTBFBMP/bbc451bb52c9fa9e891221f09db5ca78f4e01882.png' }}
                style={styles.earthImage}
              />
            </View>

            {/* Planets with touchable wrappers - Only 4 planets */}
            {/* Below earth right big planet - Amor Streak */}
            <TouchableOpacity 
              style={[styles.planet1Container, { top: 485, right: 20 }]}
              onPress={() => handlePlanetPress('amorStreak')}
            >
              <Image source={{ uri: planets.amorStreak.image }} style={styles.planet1Image} />
            </TouchableOpacity>

            {/* Below earth left big planet - Lit Score */}
            <TouchableOpacity 
              style={[styles.planet2Container, { top: 590, left: 50 }]}
              onPress={() => handlePlanetPress('litScore')}
            >
              <Image source={{ uri: planets.litScore.image }} style={styles.planet2Image} />
            </TouchableOpacity>

            {/* Above earth right small planet - Amor Fly */}
            <TouchableOpacity 
              style={[styles.planet3Container, { top: 280, right: 40 }]}
              onPress={() => handlePlanetPress('amorFly')}
            >
              <Image source={{ uri: planets.amorFly.image }} style={styles.planet3Image} />
            </TouchableOpacity>

            {/* Above earth left small planet - Lone Town */}
            <TouchableOpacity 
              style={[styles.planet4Container, { top: 385, left: 20 }]}
              onPress={() => handlePlanetPress('loneTown')}
            >
              <Image source={{ uri: planets.loneTown.image }} style={styles.planet4Image} />
            </TouchableOpacity>

            {/* Arrow Tags for Planets */}
            {showTag === 'amorStreak' && (
              <ArrowTag 
                name="Amor Streak"
                icon={planets.amorStreak.icon}
                onPress={() => handleTagPress('amorStreak', 'planet')}
                position={{ top: 610, right: 20 }}
              />
            )}
            
            {showTag === 'litScore' && (
              <ArrowTag 
                name="Lit Score"
                icon={planets.litScore.icon}
                onPress={() => handleTagPress('litScore', 'planet')}
                position={{ top: 700, left: 50 }}
              />
            )}
            
            {showTag === 'amorFly' && (
              <ArrowTag 
                name="Amor Fly"
                icon={planets.amorFly.icon}
                onPress={() => handleTagPress('amorFly', 'planet')}
                position={{ top: 355, right: 0 }}
              />
            )}
            
            {showTag === 'loneTown' && (
              <ArrowTag 
                name="Lone Town"
                icon={planets.loneTown.icon}
                onPress={() => handleTagPress('loneTown', 'planet')}
                position={{ top: 450, left: 0 }}
              />
            )}

            {/* Bonus Stars */}
            {/* Star bottom right to earth - Dates written in the stars */}
            <TouchableOpacity 
              style={[styles.starContainer, { top: 410, right: 50 }]}
              onPress={() => handleStarPress('datesInStars')}
            >
              <Image source={{ uri: stars.earnXP.image }} style={styles.starImage} />
            </TouchableOpacity>
            
            {/* Star top left to earth - Earn XP */}
            <TouchableOpacity 
              style={[styles.starContainer, { top: 495, left: 80 }]}
              onPress={() => handleStarPress('earnXP')}
            >
              <Image source={{ uri: stars.earnXP.image }} style={styles.starImage} />
            </TouchableOpacity>

            {/* Arrow Tags for Stars */}
            {showTag === 'datesInStars' && (
              <ArrowTag 
                name="Dates in Stars"
                icon={stars.datesInStars.icon}
                onPress={() => handleTagPress('datesInStars', 'star')}
                position={{ top: 460, right: 0 }}
              />
            )}
            
            {showTag === 'earnXP' && (
              <ArrowTag 
                name="Earn XP"
                icon={stars.earnXP.icon}
                onPress={() => handleTagPress('earnXP', 'star')}
                position={{ top: 550, left: 50 }}
              />
            )}

            {/* Planet Details Modal */}
            <PlanetDetails
              visible={modalVisible}
              planet={selectedPlanet}
              onClose={handleCloseModal}
              onEnter={handleEnterPlanet}
            />

            <StatusBar style="light" />
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: { 
    flex: 1,
  },
  backgroundImage: { 
    flex: 1, 
    width: '100%', 
    height: '100%',  
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  searchContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 50,
    justifyContent: 'center',
    zIndex: 10,
  },
  searchInput: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontFamily: 'monospace',
    includeFontPadding: false,
    padding: 0,
  },

  ellipseSvg: {
    position: "absolute",
    transform: [{ rotate: '150deg' }],
    marginTop: 30,
    marginLeft: 20,
    top: 70,
    scaleX: 1.5,
  },
  ellipseSvg2: {
    transform: [{ rotate: '150deg' }],
    marginLeft: -140,
    marginTop: 30,
    top: 70,
    scaleX: 1.5,
  },

  earthbg: {
    width: 180,
    height: 180,
    borderRadius: 95,
    marginTop:60,
    backgroundColor: '#ffffff33',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 200,
    left: '50%',
    marginLeft: -95,
    zIndex: 10,
  },
  earthImage: { width: 170, height: 170 },

  planetContainer: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#ffffff33',
    transform: [{ rotate: '-15deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    zIndex: 5,
  },
  planetImage: { width: 60, height: 60 },
  planet1Container: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    transform: [{ rotate: '-30deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    zIndex: 5,
  },
  planet1Image: { width: 130, height: 130 },
  planet2Container: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: '#ffffff33',
    transform: [{ rotate: '-20deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    zIndex: 5,
  },
  planet2Image: { width: 100, height: 100 },
  planet3Container: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#ffffff33',
    transform: [{ rotate: '-20deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    zIndex: 5,
  },
  planet3Image: { width: 60, height: 60 },
  planet4Container: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#ffffff33',
    transform: [{ rotate: '0deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    zIndex: 5,
  },
  planet4Image: { width: 60, height: 60 },

  starContainer: {
    position: "absolute",
    backgroundColor: '#ffffff33',
    padding: 6,
    borderRadius: 20,
    zIndex: 5,
  },
  starImage: {
    height: 20,
    width: 20
  },
  
  // Arrow Tag styles
  arrowTagContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  arrowTagText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  arrow: {
    position: 'absolute',
    bottom: 35,
    left: '50%',
    marginLeft: -8,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    transform: [{ rotate: '180deg' }],
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
  },
  
  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'rgba(68, 68, 68, 1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  closeButton1: {
    position: 'absolute',
    left: 1,
    top: 15,
  },
  closeButton: {
    position: 'absolute',
    right: 1,
    top: 15,
  },
  modalPlanetImage: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  modalPlanetName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalPlanetDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  enterButton: {
    backgroundColor: 'rgba(217, 217, 217, 1)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  enterButtonText: {
    color: 'dark-grey',
    fontSize: 18,
    fontWeight: 'bold',
  },
});