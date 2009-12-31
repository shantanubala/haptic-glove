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
[ConfusionMatrix, TimeMatrix, TimePerExp, NoTrails] = GetConfuAndTimeMat (ExpressionDataDir, 0);
figure;
bar3 (ConfusionMatrix');
ylabel('Response');
xlabel('Stimulation');
zlabel('Percent Response');
set (gca, 'XLim', [0.5 7.5]);
set (gca, 'XTickLabel', {'Happy', 'Sad', 'Surprise', 'Neutral', 'Angry', 'Fear', 'Disgust'});
set (gca, 'YLim', [0.5 7.5]);
set (gca, 'YTickLabel', {'Happy', 'Sad', 'Surprise', 'Neutral', 'Angry', 'Fear', 'Disgust'});


figure;
imagesc(ConfusionMatrix);
ylabel('Stimulation');
xlabel('Response');
zlabel('Percent Response');
% %set (gca, 'XTick', [0.5:7.5]); 
set (gca, 'XTickLabel', {'Happy', 'Sad', 'Surprise', 'Neutral', 'Angry', 'Fear', 'Disgust'});
% %set (gca, 'YTick', [0.5:7.5]); 
set (gca, 'YTickLabel', {'Happy', 'Sad', 'Surprise', 'Neutral', 'Angry', 'Fear', 'Disgust'});

figure;
CorrectRate = diag (ConfusionMatrix);
AvgGroup1 = mean(CorrectRate(1:4));
AvgGroup2 = mean(CorrectRate(5:end));
Avg = mean (CorrectRate);
BarHan = bar (CorrectRate');
colormap cool;
hold on;
plot (0:0.5:4.5, ones(1,10)*AvgGroup1, '--b', 'LineWidth', 2);
plot (4.5:0.5:8, ones(1,8)*AvgGroup2, '-.r', 'LineWidth', 2);
plot (0:8, ones(1,9)*Avg, '-k', 'LineWidth', 2);
hold off;
axis ([0 8 70 100]);
box off;
set (gca, 'XTickLabel', {'Happy', 'Sad', 'Surprise', 'Neutral', 'Angry', 'Fear', 'Disgust'});


figure;
imagesc((TimeMatrix/1000));
ylabel('Stimulation');
xlabel('Response');
zlabel('Percent Response');
% %set (gca, 'XTick', [0.5:7.5]); 
set (gca, 'XTickLabel', {'Happy', 'Sad', 'Surprise', 'Neutral', 'Angry', 'Fear', 'Disgust'});
% %set (gca, 'YTick', [0.5:7.5]); 
set (gca, 'YTickLabel', {'Happy', 'Sad', 'Surprise', 'Neutral', 'Angry', 'Fear', 'Disgust'});


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
set (gca, 'YTickLabel', {'Happy', 'Sad', 'Surprise', 'Neutral', 'Angry', 'Fear', 'Disgust'});
xlabel ('Response');
set (gca, 'XTickLabel', {'Correct', 'Incorrect'});
colormap ('COOL');


% Time comparison
figure;
hold on;
TimeAvgCorrect = TimeAvgCorrect/1000;
TimeAvgIncorrect = TimeAvgIncorrect/1000;
CorrAvg = mean(TimeAvgCorrect);
WrongAvg = mean(TimeAvgIncorrect);

AvgEmoticon = mean(TimeAvgCorrect(1:4));
AvgNonEmo = mean(TimeAvgCorrect(5:7));

plot (0:8, ones(1,9)*CorrAvg, 'c', 'LineWidth', 2);
plot (0:8, ones(1,9)*WrongAvg, 'r', 'LineWidth', 2, 'LineStyle', ':');
axis ([0 8 0 3]);
h = bar(TimeAvgCorrect, 0.8, 'c');
set(h, 'BaseValue', CorrAvg);

h1 = bar(TimeAvgIncorrect, 0.6, 'r');
set(get(h1, 'BaseLine'), 'LineStyle', ':', 'LineWidth', 2, 'Color', 'r');
set(h1, 'BaseValue', WrongAvg);

set (gca, 'XTickLabel', {'', 'Happy', 'Sad', 'Surprise', 'Neutral', 'Angry', 'Fear', 'Disgust', ''});
plot (0.5:4.5, ones(1,5)*AvgEmoticon, '-.b', 'LineWidth', 2);
plot (4.5:0.5:7.5, ones(1,7)*AvgNonEmo, '--m', 'LineWidth', 2);

% Steven results
[ConfusionMatrix, TimeMatrix, TimePerExp, NoTrails] = GetConfuAndTimeMat (ExpressionDataDir, 1, 'ste*.txt');
figure;
CorrectRate = diag (ConfusionMatrix);
AvgGroup1 = mean(CorrectRate(1:4));
AvgGroup2 = mean(CorrectRate(5:end));
Avg = mean (CorrectRate);
BarHan = bar (CorrectRate');
colormap cool;
hold on;
plot (0:0.5:4.5, ones(1,10)*AvgGroup1, '--b', 'LineWidth', 2);
plot (4.5:0.5:8, ones(1,8)*AvgGroup2, '-.r', 'LineWidth', 2);
plot (0:8, ones(1,9)*Avg, '-k', 'LineWidth', 2);
hold off;
axis ([0 8 80 105]);
box off;
set (gca, 'XTickLabel', {'Happy', 'Sad', 'Surprise', 'Neutral', 'Angry', 'Fear', 'Disgust'});

