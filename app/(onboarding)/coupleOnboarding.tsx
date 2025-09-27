
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const LitAmorOnboarding = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [formData, setFormData] = useState({ name: '', dateOfBirth: '', height: '', gender: '', pronouns: 'They/Them', showPronouns: false, joyActivities: [] as string[], mainInterests: [] as string[], secondaryInterests: [] as string[], lifeGoals: [] as string[], bio: '', photos: [] as string[], partnerInvite: '', howMet: '', relationshipDuration: '' });
  const toggleLifeGoal = (goal: string) => {
    setFormData((prev) => {
      const selected = prev.lifeGoals.includes(goal);
      if (selected) {
        return { ...prev, lifeGoals: prev.lifeGoals.filter(a => a !== goal) };
      } else if (prev.lifeGoals.length < 2) {
        return { ...prev, lifeGoals: [...prev.lifeGoals, goal] };
      }
      return prev;
    });
  };
  const toggleSecondaryInterest = (interest: string) => {
    setFormData((prev) => {
      const selected = prev.secondaryInterests.includes(interest);
      if (selected) {
        return { ...prev, secondaryInterests: prev.secondaryInterests.filter(a => a !== interest) };
      } else {
        return { ...prev, secondaryInterests: [...prev.secondaryInterests, interest] };
      }
    });
  };
  const toggleMainInterest = (interest: string) => {
    setFormData((prev) => {
      const selected = prev.mainInterests.includes(interest);
      if (selected) {
        return { ...prev, mainInterests: prev.mainInterests.filter(a => a !== interest) };
      } else {
        return { ...prev, mainInterests: [...prev.mainInterests, interest] };
      }
    });
  };
  const toggleJoyActivity = (activity: string) => {
    setFormData((prev) => {
      const selected = prev.joyActivities.includes(activity);
      if (selected) {
        return { ...prev, joyActivities: prev.joyActivities.filter(a => a !== activity) };
      } else if (prev.joyActivities.length < 4) {
        return { ...prev, joyActivities: [...prev.joyActivities, activity] };
      }
      return prev;
    });
  };

  const nextScreen = () => {
    setCurrentScreen(currentScreen + 1);
  };

  const updateFormData = (key: string, value: string | boolean) => {
    setFormData((prev: typeof formData) => ({ ...prev, [key]: value }));
  };

  if (currentScreen === 1) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>About You</Text></View>
        <View style={styles.content}>
          <Text style={styles.title}>What should we call you?</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={formData.name}
            onChangeText={text => updateFormData('name', text)}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            style={[styles.button, !formData.name.trim() && styles.buttonDisabled]}
            onPress={nextScreen}
            disabled={!formData.name.trim()}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 2) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>About You</Text></View>
        <View style={styles.content}>
          <Text style={styles.title}>What's your date of birth?</Text>
          <TextInput
            style={styles.input}
            placeholder="DD / MM / YYYY"
            value={formData.dateOfBirth}
            onChangeText={text => updateFormData('dateOfBirth', text)}
            placeholderTextColor="#aaa"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={[styles.button, !formData.dateOfBirth.trim() && styles.buttonDisabled]}
            onPress={nextScreen}
            disabled={!formData.dateOfBirth.trim()}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 3) {
    const heights = ['165', '166', '167', '168', '169', '170'];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>About You</Text></View>
        <View style={styles.content}>
          <Text style={styles.title}>How tall are you?</Text>
          <View style={{ width: '100%', marginBottom: 32 }}>
            {heights.map((height) => (
              <TouchableOpacity
                key={height}
                style={[styles.optionButton, formData.height === height && styles.optionButtonSelected]}
                onPress={() => updateFormData('height', height)}
              >
                <Text style={[styles.optionButtonText, formData.height === height && styles.optionButtonTextSelected]}>{height} cm</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.button, !formData.height && styles.buttonDisabled]}
            onPress={nextScreen}
            disabled={!formData.height}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 4) {
    const genders = ['Male', 'Female', 'Non-binary', 'Transgender', 'Prefer not to say'];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>About You</Text></View>
        <View style={styles.content}>
          <Text style={styles.title}>What's your Gender?</Text>
          <View style={{ width: '100%', marginBottom: 32 }}>
            {genders.map((gender) => (
              <TouchableOpacity
                key={gender}
                style={[styles.optionButton, formData.gender === gender && styles.optionButtonSelected]}
                onPress={() => updateFormData('gender', gender)}
              >
                <Text style={[styles.optionButtonText, formData.gender === gender && styles.optionButtonTextSelected]}>{gender}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.button, !formData.gender && styles.buttonDisabled]}
            onPress={nextScreen}
            disabled={!formData.gender}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 5) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>About You</Text></View>
        <View style={styles.content}>
          <Text style={styles.title}>What's your pronouns?</Text>
          <Text style={{ color: '#888', marginBottom: 8 }}>(Optional)</Text>
          <View style={{ width: '100%', marginBottom: 24 }}>
            <TextInput
              style={styles.input}
              value={formData.pronouns}
              onChangeText={text => updateFormData('pronouns', text)}
              placeholder="They/Them"
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 24 }}>
            <Text style={{ color: '#333', fontSize: 16 }}>Show on profile</Text>
            <TouchableOpacity
              onPress={() => updateFormData('showPronouns', !formData.showPronouns)}
              style={{ width: 50, height: 30, borderRadius: 15, backgroundColor: formData.showPronouns ? '#FF3CAC' : '#ccc', justifyContent: 'center' }}
            >
              <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: '#fff', marginLeft: formData.showPronouns ? 22 : 2 }} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={nextScreen}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 6) {
    const activities = [
      { name: 'Music', icon: '🎵' },
      { name: 'Reading', icon: '📚' },
      { name: 'Cooking', icon: '🍳' },
      { name: 'Gaming', icon: '🎮' },
      { name: 'Movies', icon: '🎬' },
      { name: 'Dancing', icon: '💃' },
      { name: 'Sleeping', icon: '😴' },
      { name: 'Writing', icon: '✍️' },
    ];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>About You</Text></View>
        <View style={styles.content}>
          <Text style={styles.title}>Pick a few things that bring you joy</Text>
          <Text style={{ color: '#888', marginBottom: 8 }}>Choose up to 4 options</Text>
          <View style={styles.grid}>
            {activities.map((activity) => (
              <TouchableOpacity
                key={activity.name}
                style={[styles.gridItem, formData.joyActivities.includes(activity.name) && styles.gridItemSelected]}
                onPress={() => toggleJoyActivity(activity.name)}
              >
                <Text style={{ fontSize: 22 }}>{activity.icon}</Text>
                <Text style={[styles.gridItemText, formData.joyActivities.includes(activity.name) && styles.gridItemTextSelected]}>{activity.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.button, formData.joyActivities.length === 0 && styles.buttonDisabled]}
            onPress={nextScreen}
            disabled={formData.joyActivities.length === 0}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 7) {
    const interests = [
      { name: 'Music', icon: '🎵' },
      { name: 'Reading', icon: '📚' },
      { name: 'Coding', icon: '💻' },
      { name: 'Creativity', icon: '✏️' },
      { name: 'Fitness', icon: '🏃' },
      { name: 'Languages', icon: '🌍' },
    ];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>About You</Text></View>
        <View style={styles.content}>
          <Text style={styles.title}>What's your main learning interest right now?</Text>
          <View style={styles.grid}>
            {interests.map((interest) => (
              <TouchableOpacity
                key={interest.name}
                style={[styles.gridItem, formData.mainInterests.includes(interest.name) && styles.gridItemSelected]}
                onPress={() => toggleMainInterest(interest.name)}
              >
                <Text style={{ fontSize: 22 }}>{interest.icon}</Text>
                <Text style={[styles.gridItemText, formData.mainInterests.includes(interest.name) && styles.gridItemTextSelected]}>{interest.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.button, formData.mainInterests.length === 0 && styles.buttonDisabled]}
            onPress={nextScreen}
            disabled={formData.mainInterests.length === 0}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 8) {
    const interests = [
      { name: 'Music', icon: '🎵' },
      { name: 'Reading', icon: '📚' },
      { name: 'Coding', icon: '💻' },
      { name: 'Creativity', icon: '✏️' },
      { name: 'Fitness', icon: '🏃' },
      { name: 'Languages', icon: '🌍' },
    ];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>About You</Text></View>
        <View style={styles.content}>
          <Text style={styles.title}>Do you also have any secondary learning interests?</Text>
          <View style={styles.grid}>
            {interests.map((interest) => (
              <TouchableOpacity
                key={interest.name}
                style={[styles.gridItem, formData.secondaryInterests.includes(interest.name) && styles.gridItemSelected]}
                onPress={() => toggleSecondaryInterest(interest.name)}
              >
                <Text style={{ fontSize: 22 }}>{interest.icon}</Text>
                <Text style={[styles.gridItemText, formData.secondaryInterests.includes(interest.name) && styles.gridItemTextSelected]}>{interest.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={nextScreen}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 9) {
    const goals = [
      { name: 'Career Growth', icon: '🏢' },
      { name: 'Learning', icon: '🎓' },
      { name: 'Personal Growth', icon: '💪' },
      { name: 'Creating', icon: '🎨' },
      { name: 'Finding True Love', icon: '💖' },
      { name: 'Building a family', icon: '👨‍👩‍👧‍👦' },
    ];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>About You</Text></View>
        <View style={styles.content}>
          <Text style={styles.title}>What is your Life Goal</Text>
          <Text style={{ color: '#888', marginBottom: 8 }}>Choose up to 2 options</Text>
          <View style={styles.grid}>
            {goals.map((goal) => (
              <TouchableOpacity
                key={goal.name}
                style={[styles.gridItem, formData.lifeGoals.includes(goal.name) && styles.gridItemSelected]}
                onPress={() => toggleLifeGoal(goal.name)}
              >
                <Text style={{ fontSize: 22 }}>{goal.icon}</Text>
                <Text style={[styles.gridItemText, formData.lifeGoals.includes(goal.name) && styles.gridItemTextSelected]}>{goal.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.button, formData.lifeGoals.length === 0 && styles.buttonDisabled]}
            onPress={nextScreen}
            disabled={formData.lifeGoals.length === 0}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 10) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>About You</Text></View>
        <View style={styles.content}>
          <Text style={styles.title}>Write Something short and sweet</Text>
          <Text style={{ color: '#888', marginBottom: 8 }}>(max 150 chars)</Text>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            placeholder="About you"
            value={formData.bio}
            onChangeText={text => updateFormData('bio', text)}
            placeholderTextColor="#aaa"
            maxLength={150}
            multiline
          />
          <Text style={{ alignSelf: 'flex-end', color: '#888', marginBottom: 16 }}>{formData.bio.length}/150</Text>
          <TouchableOpacity
            style={[styles.button, !formData.bio.trim() && styles.buttonDisabled]}
            onPress={nextScreen}
            disabled={!formData.bio.trim()}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 11) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>About You</Text></View>
        <View style={styles.content}>
          <Text style={styles.title}>Upload your Photos</Text>
          <Text style={{ color: '#888', marginBottom: 8 }}>Your photos will be visible after 3-4 days of matching</Text>
          <View style={styles.photoGrid}>
            {[1,2,3,4,5,6].map((slot) => (
              <View key={slot} style={styles.photoSlot}>
                <Text style={{ fontSize: 32, color: '#ccc' }}>+</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={nextScreen}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 12) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>Invite</Text></View>
        <View style={styles.content}>
          <Text style={styles.title}>Invite your partner to LitAmor! 💖</Text>
          <Text style={{ color: '#888', marginBottom: 8, textAlign: 'center' }}>Once they accept, your couple features unlock — and the fun begins.</Text>
          <View style={{ flexDirection: 'row', width: '100%', marginBottom: 16, backgroundColor: '#f0f0f0', borderRadius: 12 }}>
            <TextInput
              style={{ flex: 1, padding: 12, fontSize: 16, color: '#222' }}
              placeholder="Email or Phone number"
              value={formData.partnerInvite}
              onChangeText={text => updateFormData('partnerInvite', text)}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={{ paddingHorizontal: 16, justifyContent: 'center' }}>
              <Text style={{ color: '#FF3CAC', fontWeight: 'bold' }}>Send Invite</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16, width: '100%' }}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
            <Text style={{ marginHorizontal: 8, color: '#888' }}>OR</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={nextScreen}
          >
            <Text style={styles.buttonText}>Share the Link</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 13) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>Invite</Text></View>
        <View style={[styles.content, { alignItems: 'center' }] }>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Hello 👋</Text>
          <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: '#e0bbff', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <Text style={{ fontSize: 40 }}>👨</Text>
          </View>
          <Text style={{ textAlign: 'center', color: '#666', marginBottom: 32 }}>
            You've got an invitation from <Text style={{ fontWeight: 'bold', color: '#FF3CAC' }}>Josh</Text> to join LitAmor.
          </Text>
          <TouchableOpacity style={styles.button} onPress={nextScreen}>
            <Text style={styles.buttonText}>Accept the Invite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#FF3CAC', marginTop: 12 }]} onPress={() => setCurrentScreen(1)}>
            <Text style={[styles.buttonText, { color: '#FF3CAC' }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 14) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>Invite</Text></View>
        <View style={[styles.content, { alignItems: 'center' }] }>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Hello 👋</Text>
          <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: '#ffe0bb', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <Text style={{ fontSize: 40 }}>👩</Text>
          </View>
          <Text style={{ textAlign: 'center', color: '#666', marginBottom: 32 }}>
            You've got an invitation from <Text style={{ fontWeight: 'bold', color: '#FF3CAC' }}>Amy</Text> to join LitAmor.
          </Text>
          <TouchableOpacity style={styles.button} onPress={nextScreen}>
            <Text style={styles.buttonText}>Accept the Invite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#FF3CAC', marginTop: 12 }]} onPress={() => setCurrentScreen(1)}>
            <Text style={[styles.buttonText, { color: '#FF3CAC' }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 15) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>Couple Mode</Text></View>
        <View style={[styles.content, { alignItems: 'center' }] }>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Hello 👋</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#ffe0bb', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
              <Text style={{ fontSize: 28 }}>👩</Text>
            </View>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#e0bbff', alignItems: 'center', justifyContent: 'center', marginLeft: 8 }}>
              <Text style={{ fontSize: 28 }}>👨</Text>
            </View>
          </View>
          <Text style={{ textAlign: 'center', color: '#666', marginBottom: 32, fontSize: 16 }}>
            Your partner just said <Text style={{ fontWeight: 'bold', color: '#FF3CAC' }}>YES!</Text> Couple mode is now unlocked — let the fun begin.
          </Text>
          <TouchableOpacity style={styles.button} onPress={nextScreen}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 16) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>Love Story Quiz</Text></View>
        <View style={[styles.content, { alignItems: 'center', flex: 1, justifyContent: 'center' }] }>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#ffe0bb', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 22 }}>👩</Text>
            </View>
            <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#baffbb', alignItems: 'center', justifyContent: 'center', marginHorizontal: 8 }}>
              <Text style={{ fontSize: 26 }}>👫</Text>
            </View>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#e0bbff', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 22 }}>👨</Text>
            </View>
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 12 }}>
            How well do you two really know your love story?
          </Text>
          <Text style={{ color: '#888', textAlign: 'center', marginBottom: 32 }}>
            Time to test your match!
          </Text>
          <TouchableOpacity style={styles.button} onPress={nextScreen}>
            <Text style={styles.buttonText}>Let's Go</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 17) {
    const options = [
      'Through friends',
      'Online / Social Media',
      'College / Workplace',
      'Family / Relatives',
      'Other',
    ];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>Bond & Preferences</Text></View>
        <View style={styles.content}>
          <Text style={styles.title}>How did you both meet?</Text>
          <View style={{ width: '100%', marginBottom: 32 }}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.optionButton, formData.howMet === option && styles.optionButtonSelected]}
                onPress={() => updateFormData('howMet', option)}
              >
                <Text style={[styles.optionButtonText, formData.howMet === option && styles.optionButtonTextSelected]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.button, !formData.howMet && styles.buttonDisabled]}
            onPress={nextScreen}
            disabled={!formData.howMet}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 18) {
    const options = [
      'Just started dating (0-3 months)',
      'In a steady relationship (3-12 months)',
      'Long-term (1-3 years)',
      'Very long-term (3+ years)',
    ];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}><Text style={styles.headerText}>Bond & Preferences</Text></View>
        <View style={styles.content}>
          <Text style={styles.title}>How long have you been together?</Text>
          <View style={{ width: '100%', marginBottom: 32 }}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.optionButton, formData.relationshipDuration === option && styles.optionButtonSelected]}
                onPress={() => updateFormData('relationshipDuration', option)}
              >
                <Text style={[styles.optionButtonText, formData.relationshipDuration === option && styles.optionButtonTextSelected]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.button, !formData.relationshipDuration && styles.buttonDisabled]}
            onPress={() => alert('Onboarding Complete!')}
            disabled={!formData.relationshipDuration}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Placeholder for next screens
  return (
    <SafeAreaView style={styles.container}>
      <Text>Onboarding complete!</Text>
    </SafeAreaView>
  );
};

  const styles = StyleSheet.create({
    photoGrid: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    photoSlot: {
      width: '30%',
      aspectRatio: 1,
      backgroundColor: '#f0f0f0',
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    grid: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    gridItem: {
      width: '47%',
      backgroundColor: '#f0f0f0',
      borderRadius: 12,
      alignItems: 'center',
      padding: 16,
      marginBottom: 12,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    gridItemSelected: {
      backgroundColor: '#fff',
      borderColor: '#FF3CAC',
    },
    gridItemText: {
      fontSize: 16,
      color: '#333',
      fontWeight: '500',
      marginTop: 6,
    },
    gridItemTextSelected: {
      color: '#FF3CAC',
      fontWeight: 'bold',
    },
    optionButton: {
      width: '100%',
      padding: 16,
      backgroundColor: '#f0f0f0',
      borderRadius: 12,
      marginBottom: 12,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    optionButtonSelected: {
      backgroundColor: '#fff',
      borderColor: '#FF3CAC',
    },
    optionButtonText: {
      fontSize: 16,
      color: '#333',
      fontWeight: '500',
    },
    optionButtonTextSelected: {
      color: '#FF3CAC',
      fontWeight: 'bold',
    },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  content: {
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 32,
    color: '#222',
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: '#FF3CAC',
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LitAmorOnboarding;
