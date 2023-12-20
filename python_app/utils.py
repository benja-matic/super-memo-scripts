import json
import numpy as np


def load_deck(path_to_deck):
    with open(path_to_deck, "r") as file:
        data = file.read()
        err_msg = "This is a .js file, not a .json file. Please convert it to .json and strip comments."
        assert not data.startswith("export default"), err_msg
        flashcards = json.loads(data)
        return flashcards


def levenshteinDistanceDP(token1, token2):
    distances = np.zeros((len(token1) + 1, len(token2) + 1))

    for t1 in range(len(token1) + 1):
        distances[t1][0] = t1

    for t2 in range(len(token2) + 1):
        distances[0][t2] = t2

    a = 0
    b = 0
    c = 0

    for t1 in range(1, len(token1) + 1):
        for t2 in range(1, len(token2) + 1):
            if token1[t1 - 1] == token2[t2 - 1]:
                distances[t1][t2] = distances[t1 - 1][t2 - 1]
            else:
                a = distances[t1][t2 - 1]
                b = distances[t1 - 1][t2]
                c = distances[t1 - 1][t2 - 1]

                if a <= b and a <= c:
                    distances[t1][t2] = a + 1
                elif b <= a and b <= c:
                    distances[t1][t2] = b + 1
                else:
                    distances[t1][t2] = c + 1

    return distances[len(token1)][len(token2)]


def standardize_deck(deck):
    """
    Make sure no typos like 'quesiton'

    :param deck: list of dictionaries, each with keys 'question' and 'answer'
    """

    for card in deck:
        if "question" not in card:
            if "Question" in card:
                card["question"] = card["Question"]
                del card["Question"]
            else:
                dists = {k: levenshteinDistanceDP(k, "question") for k in card.keys()}
                min_val = 100_000
                for k, v in dists.items():
                    if v < min_val:
                        min_val = v
                        min_key = k

                card["question"] = card[min_key]
                del card[min_key]

        if "answer" not in card:
            if "Answer" in card:
                card["answer"] = card["Answer"]
                del card["Answer"]
            else:
                dists = {k: levenshteinDistanceDP(k, "answer") for k in card.keys()}
                min_val = 100_000
                for k, v in dists.items():
                    if v < min_val:
                        min_val = v
                        min_key = k

                card["answer"] = card[min_key]
                del card[min_key]

    return deck


import logging
import functools


def log_function_call(func):
    """Decorator to log function calls and their arguments."""

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # Log the function call and its arguments
        arg_list = [repr(a) for a in args] + [f"{k}={v!r}" for k, v in kwargs.items()]
        arg_str = ", ".join(arg_list)
        logging.info(f"Calling {func.__name__} with args: {arg_str}")

        # Call the original function
        return func(*args, **kwargs)

    return wrapper
