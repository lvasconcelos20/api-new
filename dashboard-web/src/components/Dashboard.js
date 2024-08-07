import React, { useState } from "react";
import LineChart from "./LineChart";
import getFakeNewsTrends from "../data/fakeData";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

const Dashboard = () => {
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState([]);

  const handleSearch = async () => {
    // Usar getFakeNewsTrends ou uma função real para buscar dados
    const data = await getFakeNewsTrends(keyword, startDate, endDate);
    setChartData(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard de Tendências de Notícias</Text>
      <TextInput
        style={styles.input}
        placeholder="Palavra-chave"
        value={keyword}
        onChangeText={setKeyword}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Início (YYYY-MM-DD)"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Fim (YYYY-MM-DD)"
        value={endDate}
        onChangeText={setEndDate}
      />
      <Button title="Buscar" onPress={handleSearch} />
      {chartData.length > 0 && <LineChart data={chartData} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default Dashboard;
