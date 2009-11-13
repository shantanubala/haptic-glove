% Important parameters to extract from the expression experiment
% 1. Average Confusion Matrix
% 2. Average Time for each entry on the confusion matrix
% 3. Average total duration of the expression experiment.
% 4. Average performace in successive time slices. (Maybe 35 sec (7x5) slices)
% 5. Expressions ordered by accuracy and duration.
% 6. User's plotted as points in a multidim space. Dimensions are:
%       a. Avg time for response
%       b. Accuracy in detection
%       c. Avg time weighted by global expression accuracy
%       d. Total duration for the experiment
%    6.1. Project this to a lower dimension for better visualization   
% 7. Expressions plotted as points in a multidim space. Dimensions are:
%       a. Starting finger
%       b. Ending finger
%       c. Number of phlanges shared with other expressions
%       d. Overlap of expression shape. (geometric representation of expressions as shapes)
%       e. Velocity of a vibration pattern (Duration and direction
%       included)
%    7.1. Project this to a lower dimension for visualization