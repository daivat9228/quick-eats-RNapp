import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";

const LogInPopup = ({ visible, setVisible }) => {
  const [crrStatus, setCrrStatus] = useState("Sign Up");

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{crrStatus}</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ width: "100%" }}>
            {crrStatus === "Sign Up" && (
              <TextInput
                placeholder="Your name"
                style={styles.input}
                autoCapitalize="words"
              />
            )}
            <TextInput
              placeholder="Your email"
              keyboardType="email-address"
              style={styles.input}
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.input}
            />
          </ScrollView>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>
              {crrStatus === "Sign Up" ? "Create account" : "Login"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setCrrStatus(crrStatus === "Sign Up" ? "Login" : "Sign Up")
            }
          >
            <Text style={styles.switchText}>
              {crrStatus === "Sign Up" ? (
                <>
                  Already have an account?{" "}
                  <Text style={styles.linkText}>Login here</Text>
                </>
              ) : (
                <>
                  Create a new account?{" "}
                  <Text style={styles.linkText}>Click here</Text>
                </>
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 13,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#f97316",
    borderRadius: 5,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  switchText: {
    color: "black",
    fontWeight: "500",
    fontSize: 14,
    textAlign: "center",
  },
  linkText: {
  color: "#f97316",
  fontWeight: "700",
  textDecorationLine: "underline", 
},
});

export default LogInPopup;
