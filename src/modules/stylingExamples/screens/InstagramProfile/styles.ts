import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f1f3f8',
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  image: {
    padding: 8,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },

  sideImageInfo: {
    alignItems: 'center',
    padding: 8,
  },

  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  stat: {
    fontSize: 10,
  },
});
