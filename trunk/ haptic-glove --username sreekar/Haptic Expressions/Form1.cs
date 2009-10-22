using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using ComplexDrawing = System.Drawing.Drawing2D;
using System.Text;
using System.Windows.Forms;
using System.Threading;
using Microsoft.Win32;
using System.Collections;
using System.IO;
using System.Media;

namespace Haptic_Expressions
{
    public partial class Form1 : Form
    {
        #region Global Variables
        // Ontime
        int OnTime = 250;
        // Time Between Motors
        int TimeBWMotors = 20;

        // Motor Duty Cycle Control
        int MotorOnTimePerCycle = 15;

        //Motor Randomization - tracks # of vibrations
        int[] expression_tally = new int[7];

        // Mapping: Thumb Top = A; Index Top = C; Pinky Bottom: N
        string HappyMotors, SadMotors, SurpriseMotors, FearMotors, DisgustMotors, AngryMotors, NeutralMotors;
        int[] HappyTimes, SadTimes, SurpriseTimes, FearTimes, DisgustTimes, AngryTimes, NeutralTimes;
        double[] HappyIntensity, SadIntensity, SurpriseIntensity, FearIntensity, DisgustIntensity, AngryIntensity, NeutralIntensity;
                
        // Find the serial port where the device is connected
        RegistryKey RegKey;

        // Capture Response Time
        DateTime StartTime, StartT;
        DateTime EndTime;

        // Enumeration of expressions
        enum Expressions {ANGRY, DISGUST, FEAR, HAPPY, SAD, SURPRISE, NEUTRAL};

        // Wave files
        System.Media.SoundPlayer StartWave, EndWave;

        // File Writing
        Random R;
        string DataDirectory = @"..\..\..\Expression Data\";
        FileStream FS;
        StreamWriter SW;
        int TotalTrials;

        #endregion

        public Form1()
        {
            StartWave = new SoundPlayer(@"..\..\Present.wav");
            EndWave = new SoundPlayer(@"..\..\Beep.wav");
            InitializeComponent();
        }

        #region Form Control Handlers
        private void Form1_Load(object sender, EventArgs e)
        {
            #region Determine Serial Port Name
            try
            {
                //Determine the serialport number
                RegKey = Registry.LocalMachine.OpenSubKey("Hardware\\Devicemap\\Serialcomm");
                if (RegKey == null)
                {
                    MessageBox.Show("Registry could not be read");
                    this.Close();
                }
                // Get all the serial ports on the system
                string[] VariousSerialPorts = RegKey.GetValueNames();

                string ComPort = null;

                // Step through each of the serial ports and determine which one if the 
                // Virtual serial port
                foreach (string SerialPortStr in VariousSerialPorts)
                {
                    if (SerialPortStr.Contains("\\VCP"))
                    {
                        System.Console.WriteLine(SerialPortStr);
                        ComPort = (string)RegKey.GetValue(SerialPortStr);
                    }
                }

                // If the virtual serial port was found, open the port
                if (ComPort != null)
                {
                    serialPort1.PortName = ComPort;
                    serialPort1.Open();
                }
                else
                {
                    MessageBox.Show("No Virtual Serial Port found");
                    this.Close();
                }
            }
            catch (Exception exp)
            {
                MessageBox.Show("Error Opening Serial Port: " + exp.Message);
            }
            #endregion

            // Load the spatio temporal patterns for all the expressions
            LoadMotorTimes();

            // Set all motor intensentities to 50%
            ChangeIntensity(0.5);

            // Initialize the Random number generator
            R = new Random();

            //set all of the expression counters to zero
            for (int i = 0; i < expression_tally.Length; i++)
            {
                expression_tally[i] = 0;
            }
         }

        /// <summary>
        /// - All Functions in this region handle the various expression buttons.
        /// - The entire form is disabled while the expression is being conveyed and reenabled once when the 
        /// expressions are all delivered.
        /// - Within each expression, the motorlist is first divided into sub motors 
        /// - Each motor in the submotor list is vibrated for the specified duration with a specified gap between vibrations.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        #region Expression Button Click Handlers
        
        private void HappyButton_Click(object sender, EventArgs e)
        {
            this.Enabled = false;
            List<string> SubMotorList = BreakDownMotorList(HappyMotors);
            VibrateMotors(SubMotorList, HappyTimes, HappyIntensity);
            this.Enabled = true;

        }

        private void SadButton_Click(object sender, EventArgs e)
        {
            this.Enabled = false;
            List<string> SubMotorList = BreakDownMotorList(SadMotors);
            VibrateMotors(SubMotorList, SadTimes, SadIntensity);
            this.Enabled = true;
        }

        private void SurpriseButton_Click(object sender, EventArgs e)
        {
            this.Enabled = false;
            List<string> SubMotorList = BreakDownMotorList(SurpriseMotors);
            VibrateMotors(SubMotorList, SurpriseTimes, SurpriseIntensity);
            this.Enabled = true;
        }

        private void FearButton_Click(object sender, EventArgs e)
        {
            this.Enabled = false;
            List<string> SubMotorList = BreakDownMotorList(FearMotors);
            VibrateMotors(SubMotorList, FearTimes, FearIntensity);
            this.Enabled = true;
        }

        private void DisgustButton_Click(object sender, EventArgs e)
        {
            this.Enabled = false;
            List<string> SubMotorList = BreakDownMotorList(DisgustMotors);
            VibrateMotors(SubMotorList, DisgustTimes, DisgustIntensity);
            this.Enabled = true;
        }

        private void AngryButton_Click(object sender, EventArgs e)
        {
            this.Enabled = false;
            List<string> SubMotorList = BreakDownMotorList(AngryMotors);
            VibrateMotors(SubMotorList, AngryTimes, AngryIntensity);
            this.Enabled = true;
        }


        private void NeutralButton_Click(object sender, EventArgs e)
        {
            this.Enabled = false;
            List<string> SubMotorList = BreakDownMotorList(NeutralMotors);
            VibrateMotors(SubMotorList, NeutralTimes, NeutralIntensity);
            this.Enabled = true;
        }

        #endregion 

        /// <summary>
        /// Duration for the motors changed
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void textBox1_TextChanged(object sender, EventArgs e)
        {
            OnTime = Convert.ToInt32(OnTimeTextBox.Text);
            LoadMotorTimes();
        }

        /// <summary>
        /// Duration of wait between motors
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void textBox2_TextChanged(object sender, EventArgs e)
        {
            TimeBWMotors = Convert.ToInt32(BtwMotorTextBox.Text);
            LoadMotorTimes();
        }

        private void trackBar1_Scroll(object sender, EventArgs e)
        {
            MotorOnTimePerCycle = trackBar1.Value;
            textBox3.Text = trackBar1.Value.ToString();
        }

        /// <summary>
        /// Handle user's response in the form of key press
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Form1_KeyDown(object sender, KeyEventArgs e)
        {
            EndTime = DateTime.Now;
            TimeSpan ResponseTime = EndTime - StartTime;
            FlushKeyboard();

            // Write the user response to the file
            if ((e.KeyValue == 97) || (e.KeyValue == 35))
            {
                SW.Write(((int)Expressions.ANGRY).ToString()+" ");
            }
            else if ((e.KeyValue == 98) || (e.KeyValue == 40))
            {
                SW.Write(((int)Expressions.DISGUST).ToString()+ " ");
            }
            else if ((e.KeyValue == 99) || (e.KeyValue == 34))
            {
                SW.Write(((int)Expressions.FEAR).ToString()+ " ");
            }
            else if ((e.KeyValue == 100) || (e.KeyValue == 37))
            {
                SW.Write(((int)Expressions.HAPPY).ToString()+ " ");
            }
            else if ((e.KeyValue == 101) || (e.KeyValue == 12))
            {
                SW.Write(((int)Expressions.SAD).ToString() + " ");
           }
            else if ((e.KeyValue == 102) || (e.KeyValue == 39))
            {
                SW.Write(((int)Expressions.SURPRISE).ToString()+ " ");
            }
            else if ((e.KeyValue == 103) || (e.KeyValue == 36))
            {
                SW.Write(((int)Expressions.NEUTRAL).ToString()+ " ");
            }

            
            //Write the time taken for the response
            double DurationMilli = Convert.ToDouble(ResponseTime.Duration().Ticks)/10000;
            SW.WriteLine(DurationMilli.ToString());
            SW.Flush();

            // Stop the timer as the user responded within 5 secs.
            timer1.Stop();

            // Check if we have reached the end of all trials
            CheckTrials();
        }

        private void checkBox1_CheckedChanged(object sender, EventArgs e)
        {
            if (checkBox1.Checked)
                this.groupBox2.Enabled = true;
            else
                this.groupBox2.Enabled = false;

        }

        private void StartButton_Click(object sender, EventArgs e)
        {
            // Disable everything else
            groupBox1.Enabled = false;

            // Start a new file
            string FileName = DataDirectory + SubjectNameTextBox.Text +DateTime.Today.ToString("dd_MM_yy_") + DateTime.Now.Hour.ToString() +
                                "_" + DateTime.Now.Minute.ToString() + "_" + DateTime.Now.Second.ToString() + ".txt";
            FS = new FileStream(FileName, FileMode.OpenOrCreate, FileAccess.Write);
            SW = new StreamWriter(FS);

            // Total trials = number of expressions * Number of times to try them
            TotalTrials = 7 * Convert.ToInt32(NoOfCyclesTextBox.Text) - 1;

            // Enable Key board capture
            this.KeyPreview = true;

            // Enable the progress bar
            progressBar1.Enabled = true;
            progressBar1.Value = 0;
            progressBar1.Maximum = TotalTrials + 1;
            progressBar1.Minimum = 0;
            progressBar1.Step = 1;
            CurrExpTextBox.Enabled = true;
            SubjectNameTextBox.Enabled = false;

            // Start the first vibration
            ToneNotification();
            int expression = R.Next(7),
                    limit = int.Parse(NoOfCyclesTextBox.Text);
            while (!(expression_tally[expression] < limit))
            {
                expression = R.Next(7);
            }
            expression_tally[expression] += 1;
            VibrateChosenMotor(expression);

            // Start the 5 sec user response cycle
            timer1.Start();
            progressBar1.PerformStep();

        }

        // Enters the timer routine only if the user did not respond within 5 secs
        private void timer1_Tick(object sender, EventArgs e)
        {
            // Stop the timer
            timer1.Stop();

            // See if we have come to the end of the trials
            SW.WriteLine();
            CheckTrials();
        }

        private void StopButton_Click(object sender, EventArgs e)
        {
            // Stop timer
            timer1.Stop();

            // Close the file
            SW.Close();
            FS.Close();

            // Enable everything else
            groupBox1.Enabled = true;

            progressBar1.Enabled = false;
            progressBar1.Value = 0;
            CurrExpTextBox.Enabled = false;
            SubjectNameTextBox.Enabled = true;

            // Disable Key board capture
            this.KeyPreview = false;

            // Give an end tone
            EndTone();

            //set all of the expression counters to zero
            for (int i = 0; i < expression_tally.Length; i++)
            {
                expression_tally[i] = 0;
            }
        }

        #endregion


        #region Support Functions

        /// <summary>
        /// Has all the spatio temporal definitions for the 7 expressions
        /// </summary>
        private void LoadMotorTimes()
        {
            HappyMotors = "CHI"; // Three motors and their order of activation
            HappyTimes = new int[5] { OnTime * 2 / 5, TimeBWMotors, OnTime * 11 / 5, TimeBWMotors, OnTime * 2 / 5 }; // Motor run and relax times
            HappyIntensity = new double[3] { 0.5, 0.5, 0.5 };

            SadMotors = "EE_FFF_KK"; // Three motors and their order of activation
            SadTimes = new int[9] { OnTime*5 /5, 0,//TimeBWMotors,
                OnTime*1 /5, 0,//TimeBWMotors,
                OnTime*3/5, 0,//TimeBWMotors, 
                OnTime*1 /5, 0,//TimeBWMotors,
                OnTime *5/5}; // Motor run and relax times
            SadIntensity = new double[5] { 0.5, 0.5, 0.5, 0.5, 0.5 };

            SurpriseMotors = "FF_DDD_HHH_JJJ_F"; // Four motors and their order of activation
            SurpriseTimes = new int[15] { 
                OnTime * 4/10, 1, 
                OnTime *3/10, 1,// TimeBWMotors, 
                OnTime *4/10, 1,//, TimeBWMotors,
                OnTime * 3/10, 1,//, TimeBWMotors, 
                OnTime *4/10, 1,//, TimeBWMotors,
                OnTime * 3/10, 1,//, TimeBWMotors,
                OnTime * 4/10, 1,//, TimeBWMotors,
                OnTime *3/10}; // Motor run and relax times
            SurpriseIntensity = new double[8] { 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5 };

            //FearMotors = "DEGKJ"; // Three motors and their order of activation
            //FearTimes = new int[9] { OnTime * 3 / 5, TimeBWMotors, OnTime * 2 / 5, TimeBWMotors, OnTime, TimeBWMotors, OnTime * 2/5, TimeBWMotors, OnTime*3/5 }; // Motor run and relax times
            //FearIntensity = new double[5] { 0.5, 0.5, 0.5, 0.5, 0.5 };

            FearMotors = "CFIIFCCFI"; // Three motors and their order of activation
            FearTimes = new int[17] { OnTime * 3 / 10, TimeBWMotors, 
                OnTime * 2 / 5, TimeBWMotors, 
                OnTime * 3 / 10, TimeBWMotors, 
                OnTime * 3 / 10, TimeBWMotors, 
                OnTime * 2 / 5, TimeBWMotors,
                OnTime * 3 / 10, TimeBWMotors,
                OnTime * 3 / 10, TimeBWMotors,
                OnTime * 2 / 5, TimeBWMotors,
                OnTime * 3 / 10}; // Motor run and relax times
            FearIntensity = new double[9] { 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5 };

            DisgustMotors = "KHE"; // Three motors and their order of activation
            DisgustTimes = new int[5] { OnTime, TimeBWMotors, OnTime, TimeBWMotors, OnTime }; // Motor run and relax times
            DisgustIntensity = new double[3] { 0.5, 0.5, 0.5 };

            // If there is an underscroe between two motors, both of them are run simulteneously
            // Corresponding to the set D_E, there is only one run time for both of them
            AngryMotors = "DD_EEGG_HHJJ_KK"; // Six motors and their order of activation
            AngryTimes = new int[17] { (OnTime / 5 * 2), TimeBWMotors, (OnTime / 5 * 2), TimeBWMotors, (OnTime / 5 * 1), TimeBWMotors, (OnTime / 5 * 2), TimeBWMotors, (OnTime / 5 * 2), TimeBWMotors, (OnTime / 5 * 1), TimeBWMotors, (OnTime / 5 * 2), TimeBWMotors, (OnTime / 5 * 2), TimeBWMotors, (OnTime / 5 * 1) }; // Motor run and relax times
            AngryIntensity = new double[9] { 0.5, 0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.25, 0.25 };

            NeutralMotors = "DGJ"; // Three motors and their order of activation
            NeutralTimes = new int[5] { OnTime, TimeBWMotors, OnTime, TimeBWMotors, OnTime }; // Motor run and relax times
            NeutralIntensity = new double[3] { 0.25, 0.25, 0.25 };
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="MotorList"></param>
        /// <returns></returns>
        private List<string> BreakDownMotorList(string MotorList)
        {
            List<string> SubMotors = new List<string>();
            int Count = 0;

            while (Count < MotorList.Length - 1)
            {
                string MotorName;

                if (MotorList[Count + 1] == '_')
                {
                    MotorName = MotorList.Substring(Count, 3);
                    Count += 3;
                }
                else
                    MotorName = MotorList.Substring(Count++, 1);

                SubMotors.Add(MotorName);
            }

            if (Count == MotorList.Length - 1)
                SubMotors.Add(MotorList.Substring(MotorList.Length - 1, 1));

            return SubMotors;
        }

        private void VibrateMotors(List<string> SubMotorList, int[] MotorTimes, double[] MotorIntensity)
        {
            for (int i = 0; i < SubMotorList.Count; i++)
            {
                TurnOnMotors(SubMotorList[i], MotorIntensity[i]);
                int RunTime = MotorTimes[i * 2];
                Thread.Sleep(RunTime);
                TurnOffMotors(SubMotorList[i]);

                if (i < SubMotorList.Count - 1)
                {
                    int OffTime = MotorTimes[(i * 2) + 1];
                    Thread.Sleep(OffTime);
                }
            }
        }
        
        private void TurnOnMotors(string Motor, double Intensity)
        {
            string Temp = Motor.ToUpper();
            
            if(this.checkBox1.Checked)
                ChangeIntensity(Intensity);

            if (Temp.Length == 1)
            {
                byte[] Data = new byte [1];                
                Data[0] = Convert.ToByte((Temp[0]));
                serialPort1.Write(Data, 0, 1);
            }
            else if (Temp.Length == 3)
            {
                byte[] Data = new byte[2];
                Data[0] = Convert.ToByte(Temp[0]);
                Data[1] = Convert.ToByte(Temp[2]);
                serialPort1.Write(Data, 0, 2);
            }
        }

        private void TurnOffMotors(string Motor)
        {
            string Temp = Motor.ToLower();
            if (Temp.Length == 1)
            {
                byte[] Data = new byte[1];
                Data[0] = Convert.ToByte(Temp[0]);
                serialPort1.Write(Data, 0, 1);
            }
            else if (Temp.Length == 3)
            {
                byte[] Data = new byte[2];
                Data[0] = Convert.ToByte(Temp[0]);
                Data[1] = Convert.ToByte(Temp[2]);
                serialPort1.Write(Data, 0, 2);
            }
        }

        private void ChangeIntensity(double DutyCycle)
        {
            Thread.Sleep(20);

            int ONTIME = MotorOnTimePerCycle;
            int OFFTIME = Convert.ToInt32((1 - DutyCycle) * ONTIME / DutyCycle);

            if (OFFTIME > 30)
                OFFTIME = 30;
            if (OFFTIME < 0)
                OFFTIME = 0;
            if (ONTIME > 30)
                ONTIME = 30;
            if (ONTIME < 0)
                ONTIME = 0;

            if (serialPort1.IsOpen)
            {
                char[] Data = new char[1];
                
                Data[0] = 'x';
                serialPort1.Write(Data, 0, 1);
                
                // Convert ONTIME to charecters
                Data[0] = Convert.ToChar((ONTIME / 10) + 48);
                serialPort1.Write(Data, 0, 1);
                Thread.Sleep(10);
               

                Data[0] = Convert.ToChar((ONTIME - ((ONTIME / 10) * 10)) + 48);
                serialPort1.Write(Data, 0, 1);
                Thread.Sleep(10);
                
                // Convert OFFTIME to charecters
                Data[0] = Convert.ToChar((OFFTIME / 10) + 48);
                serialPort1.Write(Data, 0, 1);
                Thread.Sleep(10);

                Data[0] = Convert.ToChar((OFFTIME - ((OFFTIME / 10) * 10)) + 48);
                serialPort1.Write(Data, 0, 1);
                Thread.Sleep(10);
            }

        }

        private void VibrateChosenMotor(int ChosenExp)
        {
            StartTime = DateTime.Now;
            
            if (ChosenExp == (int)Expressions.ANGRY)
            {
                CurrExpTextBox.Text = "ANGRY";
                List<string> SubMotorList = BreakDownMotorList(AngryMotors);
                VibrateMotors(SubMotorList, AngryTimes, AngryIntensity);
                SW.Write(((int)Expressions.ANGRY).ToString()+ " ");
                
            }
            else if (ChosenExp == (int)Expressions.FEAR)
            {
                CurrExpTextBox.Text = "FEAR";
                List<string> SubMotorList = BreakDownMotorList(FearMotors);
                VibrateMotors(SubMotorList, FearTimes, FearIntensity);
                SW.Write(((int)Expressions.FEAR).ToString()+ " ");
                
            }
            else if (ChosenExp == (int)Expressions.HAPPY)
            {
                CurrExpTextBox.Text = "HAPPY";
                List<string> SubMotorList = BreakDownMotorList(HappyMotors);
                VibrateMotors(SubMotorList, HappyTimes, HappyIntensity);
                SW.Write(((int)Expressions.HAPPY).ToString()+ " ");
                
            }
            else if (ChosenExp == (int)Expressions.NEUTRAL)
            {
                CurrExpTextBox.Text = "NEUTRAL";
                List<string> SubMotorList = BreakDownMotorList(NeutralMotors);
                VibrateMotors(SubMotorList, NeutralTimes, NeutralIntensity);
                SW.Write(((int)Expressions.NEUTRAL).ToString()+ " ");
                
            }
            else if (ChosenExp == (int)Expressions.DISGUST)
            {
                CurrExpTextBox.Text = "DISGUST";
                List<string> SubMotorList = BreakDownMotorList(DisgustMotors);
                VibrateMotors(SubMotorList, DisgustTimes, DisgustIntensity);
                SW.Write(((int)Expressions.DISGUST).ToString() + " ");
                
            }
            else if (ChosenExp == (int)Expressions.SAD)
            {
                CurrExpTextBox.Text = "SAD";
                List<string> SubMotorList = BreakDownMotorList(SadMotors);
                VibrateMotors(SubMotorList, SadTimes, SadIntensity);
                SW.Write(((int)Expressions.SAD).ToString() + " ");
                
            }
            else if (ChosenExp == (int)Expressions.SURPRISE)
            {
                CurrExpTextBox.Text = "SURPRISE";
                List<string> SubMotorList = BreakDownMotorList(SurpriseMotors);
                VibrateMotors(SubMotorList, SurpriseTimes, SurpriseIntensity);
                SW.Write(((int)Expressions.SURPRISE).ToString() + " ");
                
            }
            else
            {
                MessageBox.Show("Illegal Expression Chosen for Random Display");
            }
            
            TimeSpan TS = DateTime.Now - StartTime;
            Double DurationMilli = Convert.ToDouble(TS.Duration().Ticks)/10000;
            SW.Write(DurationMilli.ToString() + " ");                        
            SW.Flush();
        }

        private void CheckTrials()
        {
            // See if we have come to the end of the trials
            // If not,
            if (TotalTrials > 0)
            {
                // Decrement the trial count
                TotalTrials--;
                progressBar1.PerformStep();

                // Start the next vibration
                ToneNotification();
                int expression = R.Next(7),
                    limit = int.Parse(NoOfCyclesTextBox.Text);
                while (!(expression_tally[expression] < limit))
                {
                    expression = R.Next(7);
                }
                expression_tally[expression] += 1;
                VibrateChosenMotor(expression);
                timer1.Start();
            }
            else
            {
                // Close the file
                SW.Close();
                FS.Close();

                // Enable everything else
                groupBox1.Enabled = true;

                progressBar1.Enabled = false;
                progressBar1.Value = 0;
                CurrExpTextBox.Enabled = false;
                SubjectNameTextBox.Enabled = true;

                // Disable Key board capture
                this.KeyPreview = false;

                // Give an end tone
                EndTone();

                //set all of the expression counters to zero
                for (int i = 0; i < expression_tally.Length; i++)
                {
                    expression_tally[i] = 0;
                }
            }
        }

        private void ToneNotification()
        {
            Thread.Sleep(500);
            //System.Console.Beep(300, 300);
            StartWave.PlaySync();            
            Thread.Sleep(500);
        }

        private void EndTone()
        {
            Thread.Sleep(500);
            EndWave.Play();           
            
        }
        #endregion

        private void button1_Click(object sender, EventArgs e)
        {
            ToneNotification();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            EndTone();
        }

        private static void FlushKeyboard()
        {
            while (Console.In.Peek() != -1)
                Console.In.Read();
        }
    }
}
