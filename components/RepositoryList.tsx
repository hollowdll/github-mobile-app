import {
  Text,
  Box,
  Heading,
  HStack,
  VStack,
  Button,
  ButtonText,
  ChevronLeftIcon,
  ChevronRightIcon,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { Repository } from "../types/repository";
import React, { useState, useEffect, useRef } from "react";
import { convertToLocaleDateString } from "../utility/date";
import { REPOS_PER_PAGE, DEFAULT_REPO_PAGE_NUMBER } from "../utility/const";
import { UserInfo } from "../types/user";
import { getUserRepositories } from "../api/api";

type Props = {
  userInfo: UserInfo | null;
};

// Shows user repositories by page number
export default function RepositoryList({ userInfo }: Props) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [page, setPage] = useState(DEFAULT_REPO_PAGE_NUMBER);
  const scrollRef = useRef<ScrollView>(null);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  // Go to previous page
  const handleOnPreviousPage = async () => {
    if (page <= DEFAULT_REPO_PAGE_NUMBER) setPage(DEFAULT_REPO_PAGE_NUMBER);
    else setPage((page) => page - 1);

    if (userInfo !== null) {
      const repos = await getUserRepositories(
        userInfo.login,
        page > DEFAULT_REPO_PAGE_NUMBER ? page - 1 : DEFAULT_REPO_PAGE_NUMBER
      );
      setRepositories(repos);
    }

    scrollToTop();
  };

  // Go to next page
  const handleOnNextPage = async () => {
    setPage((page) => page + 1);

    if (userInfo !== null) {
      const repos = await getUserRepositories(userInfo.login, page + 1);
      setRepositories(repos);
    }

    scrollToTop();
  };

  useEffect(() => {
    if (userInfo !== null) {
      getUserRepositories(userInfo.login, 1).then((repos) =>
        setRepositories(repos)
      );
    }
  }, []);

  return (
    <Box m="$3">
      <ScrollView ref={scrollRef}>
        {repositories.map((item, _index) => (
          <Box
            borderBottomWidth="$1"
            py="$2"
            borderColor="$trueGray800"
            key={item.id}
          >
            <HStack space="md" justifyContent="space-between">
              <VStack>
                <Heading>{item.name}</Heading>
                <Text style={styles.info}>{item.description}</Text>
                <Text>
                  Created: {convertToLocaleDateString(item.createdAt)}
                </Text>
                <Text>Most used language: {item.language}</Text>
              </VStack>
            </HStack>
          </Box>
        ))}
        <HStack mt="$4" space="md" justifyContent="space-between">
          <Button
            isDisabled={page === DEFAULT_REPO_PAGE_NUMBER}
            onPress={handleOnPreviousPage}
          >
            <ButtonIcon as={ChevronLeftIcon} />
            <ButtonText> Previous</ButtonText>
          </Button>
          <Text mt="$2" style={styles.info}>
            Page {page}
          </Text>
          <Button
            isDisabled={repositories.length !== REPOS_PER_PAGE}
            onPress={handleOnNextPage}
          >
            <ButtonText>Next </ButtonText>
            <ButtonIcon as={ChevronRightIcon} />
          </Button>
        </HStack>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  info: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
