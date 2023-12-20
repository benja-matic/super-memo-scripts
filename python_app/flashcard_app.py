import tkinter as tk
from tkinter import messagebox, ttk
import json
import datetime
import os
import logging
import sys

import numpy as np

from utils import load_deck, standardize_deck, log_function_call


# TODO: change color of buttons when you hit them
# TODO: enable keyboard shortcuts


class FlashcardApp:
    def __init__(self, path_to_flashcards):
        # Initialize a logger and set it to save to a file
        file_handler = logging.FileHandler("flashcard_app.log")
        stream_handler = logging.StreamHandler()
        logging.basicConfig(
            level=logging.INFO,
            format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
            handlers=[file_handler, stream_handler],
        )

        # Load flashcards
        self.flashcards = load_deck(path_to_flashcards)
        self.flashcards = standardize_deck(self.flashcards)

        # Load or initialize metrics
        self.deck_name = os.path.split(path_to_flashcards)[-1].split(".")[0]
        self.output_stats_file = self.deck_name + "_stats.json"
        if os.path.exists(self.output_stats_file):
            with open(self.output_stats_file, "r") as file:
                self.stats = json.loads(file.read())
        else:
            self.stats = {
                fc["question"]: {"views": 0, "scores": []} for fc in self.flashcards
            }

        # Initialize Tkinter window
        self.window = tk.Tk()
        self.window.title("Flashcard Viewer")
        self.window.protocol("WM_DELETE_WINDOW", self.on_closing)
        self.window.geometry("550x330")
        self.window.bind("<Return>", lambda event: self.reveal_answer(event))
        self.mainframe = ttk.Frame(self.window, padding="3 3 12 12")
        self.mainframe.grid(column=0, row=0, sticky=("N", "W", "E", "S"))
        self.window.columnconfigure(0, weight=1)
        self.window.rowconfigure(0, weight=1)

        # Shuffle cards
        self.idx = np.arange(len(self.flashcards), dtype=int)
        np.random.shuffle(self.idx)

        self.current_card = tk.IntVar(value=0)

        self.question_label = tk.Label(self.mainframe, text="", font=("Arial", 20))
        self.question_label.pack()

        self.answer_label = tk.Label(self.mainframe, text="", font=("Arial", 16))
        self.answer_label.pack()

        self.score_label = tk.Label(self.mainframe, text="Answer: ")
        self.score_label.pack()

        self.answer_entry = tk.Entry(self.mainframe)
        self.answer_entry.pack()

        self.buttons = dict()
        self.show_button = tk.Button(
            self.mainframe, text="Show Answer", command=self.reveal_answer
        )
        # self.show_button.place(x=205, y=120)
        self.show_button.pack()
        self.buttons["show"] = self.show_button

        for i in range(1, 6):
            self.buttons[str(i)] = tk.Button(
                self.mainframe,
                text=str(i),
                command=lambda: self.record_and_press_and_next(i),
                activebackground="green",
            )
            self.buttons[str(i)].pack()

        self.next_button = tk.Button(
            self.mainframe, text="Next Flashcard", command=self.next_flashcard
        )
        # self.next_button.place(x=205, y=180)
        self.next_button.pack()

        self.back_button = tk.Button(
            self.mainframe, text="Previous Flashcard", command=self.go_back
        )
        self.back_button.pack()

        # Register keyboard shortcuts for 1-5
        for i in range(1, 6):
            self.window.bind(
                str(i), lambda event, i=i: self.record_and_press_and_next(i)
            )

    @log_function_call
    def _get_flashcard(self):
        return self.flashcards[self.idx[self.current_card.get()]]

    @log_function_call
    def pressed(self, i):
        self.buttons[str(i)].config(bg="green")
        self.buttons[str(i)].after(
            1000, lambda: self.buttons[str(i)].config(bg="white")
        )

    @log_function_call
    def go_back(self):
        self.current_card.set((self.current_card.get() - 1) % len(self.flashcards))
        self.show_flashcard()

    @log_function_call
    def record_and_press_and_next(self, i):
        self.record_score(i)
        self.pressed(i)
        self.next_flashcard()

    @log_function_call
    def run(self):
        self.show_flashcard()
        self.window.mainloop()

    @log_function_call
    def show_flashcard(self):
        card = self._get_flashcard()
        self.question_label.config(text=card["question"])
        self.answer_label.config(text="")
        self.answer_entry.delete(0, tk.END)

    @log_function_call
    def reveal_answer(self, event=None):
        card = self._get_flashcard()
        self.answer_label.config(text=card["answer"])

    @log_function_call
    def record_score(self, score=None):
        card = self._get_flashcard()
        self.stats[card["question"]]["views"] += 1
        self.stats[card["question"]]["scores"].append(
            (score, str(datetime.datetime.now()))
        )

    @log_function_call
    def next_flashcard(self):
        self.current_card.set((self.current_card.get() + 1) % len(self.flashcards))
        self.show_flashcard()

    @log_function_call
    def on_closing(self):
        if messagebox.askokcancel("Quit", "Do you want to quit?"):
            self.save_and_quit()

    @log_function_call
    def save_stats(self):
        with open(self.output_stats_file, "w") as file:
            file.write(json.dumps(self.stats))

    @log_function_call
    def save_and_quit(self):
        self.save_stats()
        self.window.destroy()


if __name__ == "__main__":
    path_to_deck = os.path.join(
        os.path.dirname(__file__), "..", "data", "CS", "linear_algebra.json"
    )
    app = FlashcardApp(path_to_deck)
    app.run()
