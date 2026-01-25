import { Link } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  const handleGenerateRecommendations = () => {
    generateRecommendations();
  };

  return (
    <div>
      <h2>Recommended for You</h2>
      <button onClick={handleGenerateRecommendations}>
        Generate Recommendations
      </button>
      {recommendations.length === 0 ? (
        <p>No recommendations yet. Click the button to generate recommendations based on your favorites!</p>
      ) : (
        <div>
          {recommendations.map(recipe => (
            <div key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`}>
                <h3>{recipe.title}</h3>
              </Link>
              <p>{recipe.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsList;
