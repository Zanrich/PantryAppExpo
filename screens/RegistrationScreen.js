import React, { useState } from 'react';
import {
  View,
  Text,
  // TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import utils from '../utils/utils'
import { TextInput, Button } from 'react-native-paper';
import CustomTextInput from '../components/CustomTextInput';

const RegistrationScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [countryCode, setCountryCode] = useState('+27');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      navigation.navigate('MainApp');
    } else {
      Alert.alert('Error', 'Please fill in all required fields');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >

        <View style={[styles.header, styles.backArowContainer]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={20} color="#54634B" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.header, styles.exploreMoreContainer]}  onPress={() => navigation.navigate('MainApp')}>
          <Text style={styles.exploreText}>Explore app</Text>
        </TouchableOpacity>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Welcome to{'\n'}Pantry by Marble</Text>
          <Text style={styles.welcomeSubtitle}>
            Sign up for easy payment, collection{'\n'}and much more
          </Text>
          <Text style={styles.greenRectangle}/>
        </View>
                    <ScrollView 
                     
                      showsVerticalScrollIndicator={false}
                      style={styles.categoriesContainer}
                    >

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <CustomTextInput
              label="Full name"
              placeholder="Full name"
              value={formData.fullName}
              onChangeText={(text) => {
                setFormData({ ...formData, fullName: text });
                setErrors({ ...errors, fullName: '' });
              }}
              onClear={() =>  setFormData({
                        fullName: '',
                        email: '',
                        mobileNumber: '',
                        password: '',
                  })}
            />
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
          </View>

          <View style={styles.inputContainer}>
            
                 
        <CustomTextInput
        label="Email"
        type="email"
        value={formData.email}
        onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
        onError={(hasError) => setErrors(prev => ({ ...prev, email: hasError }))}
      />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          <View style={styles.inputContainer}>
          <CustomTextInput
        label="Mobile number"
        type="phone"
        value={formData.phone}
        onChangeText={(text) => {
          setFormData({ ...formData, mobileNumber: text });
          setErrors({ ...errors, mobileNumber: '' });
        }}
        countryCode={countryCode}
        onCountryCodeChange={setCountryCode}
      />

            {errors.mobileNumber && <Text style={styles.errorText}>{errors.mobileNumber}</Text>}
          </View>

          <View style={styles.inputContainer}>
            {/* <View style={styles.passwordContainer}> */}
                  <CustomTextInput
        label="Create password"
        type="password"
        value={formData.password}
        onChangeText={(text) => {
          setFormData({ ...formData, password: text });
          setErrors({ ...errors, password: '' });}}
      />
            
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp}
          >
            <Text style={styles.signUpButtonText}>Sign up</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('MainApp')}
          >
            <Text style={styles.exploreButtonText}>Explore our app</Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By signing up you agree to our{' '}
            <Text style={styles.termsLink}>Terms</Text>,{' '}
            <Text style={styles.termsLink}>Data Policy</Text>, and{' '}
            <Text style={styles.termsLink}>Cookies Policy</Text>
          </Text>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backArowContainer: {
    marginBottom: 2
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal:16,
  },
  content: {
    flex: 1,
    // paddingHorizontal: 16,
  },
  header: {
    height: '20px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // backButton: {
  //   padding: 8,
  // },
  exploreMoreContainer: {
    justifyContent: 'flex-end',
  },
  exploreText: {
    fontSize: 14,
    color: '#54634B',
    fontFamily: 'Avenir',
    lineHeight: 20,
    alignSelf:'flex-end'
  },
  welcomeContainer: {
    top: -6,
    marginBottom: 82,
  },
  welcomeTitle: {
    fontFamily: 'AdobeGaramondProBoldItalic',
    fontSize: 40,
    lineHeight: 50,
    color: '#54634B',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#54634B',
    fontFamily: 'Avenir',
    lineHeight: 24,
    marginBottom: 8,
  },
  greenRectangle: {
    backgroundColor: "#54634B", 
    height: 15 
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    fontSize: 16,
    paddingVertical: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  passwordInput: {
    flex: 1,
    borderBottomWidth: 0,
  },
  eyeIcon: {
    padding: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  signUpButton: {
    backgroundColor: '#54634B',
    borderRadius: 80,
    paddingVertical: 16,
    marginTop: 40,
    height: 56,
  },
  signUpButtonText: {
    color: '#FCF9F5',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Avenir',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#54634B',
    fontFamily: 'Avenir',
    fontSize: 14,
    lineHeight: 20,
  },
  loginLink: {
    color: '#4A5D4F',
    fontWeight: '800',
    fontFamily: 'Avenir',
    fontSize: 14,
    lineHeight: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#54634B',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#4A5D4F',
    fontWeight: '400',
    fontFamily: 'Avenir',
    fontSize: 14,
    lineHeight: 20,
  },
  exploreButton: {
    backgroundColor: '#54634B',
    borderRadius: 80,
    paddingVertical: 16,
    height: 56,
  },
  exploreButtonText: {
    color: '#FCF9F5',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Avenir',
  },
  termsText: {
    fontSize: 12,
    color: '#54634B',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 27,
    lineHeight: 20,
    fontFamily: 'Avenir',
  },
  termsLink: {
    color: '#54634B',
    fontWeight: 800,
  },
});

export default RegistrationScreen;