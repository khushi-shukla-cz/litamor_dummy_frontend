import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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