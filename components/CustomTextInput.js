// import React, { useState, useRef, useEffect } from 'react';
// import { View, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const CustomTextInput = ({ 
//   label, 
//   value, 
//   onChangeText, 
//   secureTextEntry = false,
//   onClear
// }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const animatedIsFocused = useRef(new Animated.Value(value === '' ? 0 : 1)).current;

//   useEffect(() => {
//     Animated.timing(animatedIsFocused, {
//       toValue: (isFocused || value !== '') ? 1 : 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   }, [animatedIsFocused, isFocused, value]);

//   const labelStyle = {
//     position: 'absolute',
//     height:16,
//     left: 0,
//     top: animatedIsFocused.interpolate({
//       inputRange: [0, 1],
//       outputRange: [18, 0],
//     }),
//     fontSize: animatedIsFocused.interpolate({
//       inputRange: [0, 1],
//       outputRange: [18, 12],
//     }),
//     lineHeight: animatedIsFocused.interpolate({
//       inputRange: [0, 1],
//       outputRange: [24, 16],
//     }),
//     fontFamily: 'Avenir',
//     color: animatedIsFocused.interpolate({
//       inputRange: [0, 1],
//       outputRange: ['#999', '#54634B'],
//     }),
//   };

//   return (
//     <View style={styles.inputContainer}>
//       <Animated.Text style={labelStyle}>
//         {label}
//       </Animated.Text>
//       <TextInput
//         style={styles.input}
//         value={value}
//         onChangeText={onChangeText}
//         secureTextEntry={secureTextEntry}
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setIsFocused(false)}
//         blurOnSubmit
//       />
//       {value.length > 0 && (
//         <TouchableOpacity style={styles.clearButton} onPress={onClear}>
//           <Ionicons name="close" size={24} color="#54634B" />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };



// const styles = StyleSheet.create({
//   inputContainer: {
//     height:48,
//     justifyContent: 'flex-start',
//     borderBottomWidth: 1,
//     borderBottomColor: '#54634B',
//     marginBottom: 4,
//   },
//   input: {
//     fontFamily: 'AdobeGaramondProBoldItalic',
//     fontSize: 18,
//     color: '#54634B',
//     lineHeight: 24,
//     justifyContent: 'flex-start',
//     top: 20,
//     padding: 0,
//     // height: 24,
//   },
//   clearButton: {
//     position: 'absolute',
//     right: 0,
//     top: 12,
//     padding: 8,
//   },
// });

// export default CustomTextInput;
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Animated, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CustomTextInput = ({ 
  label, 
  value, 
  onChangeText, 
  type = 'text', // 'text', 'email', 'phone', 'password'
  onError,
  countryCode = '+27',
  onCountryCodeChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const animatedIsFocused = useRef(new Animated.Value(value === '' ? 0 : 1)).current;

  // Animation effect
  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: (isFocused || value !== '') ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedIsFocused, isFocused, value]);

  // Validation effect
  useEffect(() => {
    if (type === 'email' && value) {
      const valid = EMAIL_REGEX.test(value);
      setIsValid(valid);
      if (valid !== isValid) {
        onError && onError(!valid);
      }
    }
  }, [value, type, isValid, onError]); // Added onError to dependencies

  const labelStyle = {
    position: 'absolute',
    left: 0, // Adjust for country code
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 16],
    }),
    lineHeight: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [24, 18],
    }),
    fontFamily: 'Avenir',
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#999', '#54634B'],
    }),
  };

  const formatPhoneNumber = (text) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    // Format as XX XXX XXXX
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return cleaned;
  };

  const handleChangeText = (text) => {
    if (type === 'phone') {
      onChangeText(formatPhoneNumber(text));
    } else {
      onChangeText(text);
    }
  };

  const renderIcon = () => {
    if (!value) return null;

    if (type === 'password') {
      return (
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons 
            name={isPasswordVisible ? "eye-off" : "eye"} 
            size={24} 
            color="#54634B" 
          />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity 
        style={styles.iconButton} 
        onPress={() => onChangeText('')}
      >
        <Ionicons name="close" size={24} color="#54634B" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, labelStyle]}>
        {label}
      </Animated.Text>
      <View style={styles.inputContainer}>
        {type === 'phone' && (
          <TextInput
            style={styles.countryCode}
            value={countryCode}
            onChangeText={onCountryCodeChange}
            keyboardType="phone-pad"
          />
        )}
        {type === 'phone' && <Text style={styles.separator}>|</Text>}
        <TextInput
          style={[
            styles.input,
            type === 'phone' && styles.phoneInput,
            !isValid && styles.invalidInput
          ]}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={type === 'password' && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={
            type === 'email' ? 'email-address' :
            type === 'phone' ? 'phone-pad' :
            'default'
          }
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          autoComplete={type === 'password' ? 'password' : 'off'}
          textContentType={
            type === 'email' ? 'emailAddress' :
            type === 'password' ? 'password' :
            type === 'phone' ? 'telephoneNumber' :
            'none'
          }
        />
        {renderIcon()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#54634B',

  },
  input: {
    flex: 1,
    fontFamily: 'AdobeGaramondProBoldItalic',
    fontSize: 18,
    color: '#54634B',
    lineHeight: 24,
    top: 9,
  },
  phoneInput: {
    marginLeft: 8,
  },
  countryCode: {
    fontFamily: 'AdobeGaramondProBoldItalic',
    fontSize: 18,
    color: '#54634B',
    width: 40,
    textAlign: 'center',
    top: 9,
  },
  separator: {
    color: '#54634B',
    fontSize: 18,
    marginHorizontal: 8,
    top: 8,
  },
  iconButton: {
    padding: 8,
    top: 10,
  },
  label: {
    fontFamily: 'Avenir',
    fontSize: 18,
    marginBottom: 8,
  },
  invalidInput: {
    borderBottomColor: '#FF0000',
  },
});

export default CustomTextInput;