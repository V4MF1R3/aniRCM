import pandas as pd
import numpy as np
import pickle
from sklearn.metrics.pairwise import linear_kernel

# Load precomputed data
with open('data/tfidf_vectorizer.pkl', 'rb') as f:
    tfidf = pickle.load(f)
with open('data/cosine_sim.pkl', 'rb') as f:
    cosine_sim = pickle.load(f)
with open('data/indices.pkl', 'rb') as f:
    indices = pickle.load(f)

# Load dataframes
df1 = pd.read_pickle('data/df1.pkl')
df2 = pd.read_pickle('data/df2.pkl')

# Function to adjust similarity with votes
def adjust_similarity_with_votes(sim_scores, mal_id, df2):
    sim_scores_with_votes = {int(mal_id): score for mal_id, score in sim_scores}
    recommendations = df2[df2['mal_id'] == mal_id]
    for _, row in recommendations.iterrows():
        rec_id = row['mal_id_recomm']
        vote = row['votes']
        if rec_id in sim_scores_with_votes:
            sim_scores_with_votes[int(rec_id)] += vote
    sim_scores_sorted = sorted(sim_scores_with_votes.items(), key=lambda x: x[1], reverse=True)
    return sim_scores_sorted

# Function to get similarity
def get_similarity(mal_id, cosine_sim=cosine_sim):
    if mal_id not in indices:
        return f"mal_id {mal_id} not found in the dataset"
    idx = indices[mal_id]
    sim_scores = cosine_sim[idx].flatten()
    sim_scores = [(int(df1['mal_id'].iloc[i]), score) for i, score in enumerate(sim_scores)]
    sim_scores_sorted = adjust_similarity_with_votes(sim_scores, mal_id, df2)
    sim_scores_top10 = [item for item in sim_scores_sorted if item[0] != mal_id][:10]
    similar_movies = {str(mal_id): score for mal_id, score in sim_scores_top10}
    return similar_movies
