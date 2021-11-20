import {
    Box,
    Button,
    Center,
    Container,
    Group,
    Input,
    RingProgress,
    Text,
    Title
  } from "@mantine/core";
  import { useGame } from "./useGame";
  
  export default function App() {
    const {
      isRunning,
      startGame,
      stopGame,
      isGameOver,
      currentWord,
      correctWordsCount,
      getLetterColor,
      countdown,
      typed,
      onInputChange,
      totalTime,
      WPM
    } = useGame();
  
    if (!isRunning && !isGameOver) {
      return (
        <Center sx={{ height: "100vh" }}>
          <Button size="xl" onClick={startGame}>
            Start Practice
          </Button>
        </Center>
      );
    }
    if (isGameOver) {
      return (
        <Center sx={{ height: "100vh" }}>
          <Box sx={{ display: "flex" }}>
            <Title>
              You got {correctWordsCount} words correct in {totalTime} seconds
            </Title>
            <Title order={3}>That's 10 WPM</Title>
            <Button size="xl" onClick={startGame}>
              Restart
            </Button>
          </Box>
        </Center>
      );
    }
    return (
      <Container size="sm" sx={{ marginTop: "8rem" }}>
        <Center>
          <Group>
            <Text>WPM:</Text>
            <Text>{WPM}</Text>
          </Group>
        </Center>
        <Center>
          <RingProgress
            sections={[{ value: (countdown / totalTime) * 100, color: "blue" }]}
            label={
              <Text color="blue" weight={700} align="center" size="xl">
                {countdown}
              </Text>
            }
          />
        </Center>
        <Box>
          <Title order={1} align="center">
            {currentWord.split("").map((letter, index) => (
              <Text component="span" size="inherit" color={getLetterColor(index)}>
                {letter}
              </Text>
            ))}
          </Title>
        </Box>
        <Input autoFocus value={typed} onChange={onInputChange} />
        {/* <Button color="red" onClick={stopGame}>
          Stop game
        </Button> */}
      </Container>
    );
  }
  