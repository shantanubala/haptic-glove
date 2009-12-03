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

clear;
clc;
close all;

% Expression Directory
ExpressionDataDir = '..\Expression Data';

% Get the confusion matrix(1), time matrix(2) and average time per
% expression (3)
[ConfusionMatrix, TimeMatrix, TimePerExp] = GetConfuAndTimeMat (ExpressionDataDir);
figure;
bar3 (ConfusionMatrix');
ylabel('Response');
xlabel('Stimulation');
zlabel('Percent Response');
set (gca, 'XLim', [0.5 7.5]);
set (gca, 'XTickLabel', {'Anger', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral'});
set (gca, 'YLim', [0.5 7.5]);
set (gca, 'YTickLabel', {'Anger', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral'});


figure;
imagesc(ConfusionMatrix);
ylabel('Response');
xlabel('Stimulation');
zlabel('Percent Response');
% %set (gca, 'XTick', [0.5:7.5]); 
set (gca, 'XTickLabel', {'Anger', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral'});
% %set (gca, 'YTick', [0.5:7.5]); 
set (gca, 'YTickLabel', {'Anger', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral'});


figure;
imagesc((TimeMatrix/1000));
ylabel('Response');
xlabel('Stimulation');
zlabel('Percent Response');
% %set (gca, 'XTick', [0.5:7.5]); 
set (gca, 'XTickLabel', {'Anger', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral'});
% %set (gca, 'YTick', [0.5:7.5]); 
set (gca, 'YTickLabel', {'Anger', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral'});


figure;
TimeAvgCorrect = zeros(1,7);
TimeAvgIncorrect = zeros(1,7);
% Average time for responses, Correct and Incorrect
for i=1:size(TimeMatrix, 1)
    % Correct repsonse time
    TimeAvgCorrect (i) = TimeMatrix(i,i);
      
    % Incorrect response time
    TimeAvgIncorrect(i) = (sum(TimeMatrix(i,:)) - TimeMatrix(i,i)) / (sum(TimeMatrix(i,:)>0)-1);
end
TimeAvg = [TimeAvgCorrect; TimeAvgIncorrect];
bar3((TimeAvg/1000)');
ylabel ('Expressions');
set (gca, 'YTickLabel', {'Anger', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral'});
xlabel ('Response');
set (gca, 'XTickLabel', {'Correct', 'Incorrect'});
colormap ('COOL');

% Time for completion
figure;
TimeForComp = TimeSlicing(ExpressionDataDir);


