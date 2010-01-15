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
using System.IO;
using Freescale.ZStarLib;

namespace Haptic_Glove
{
    public partial class Form1 : Form
    {
        #region Global Data
        // Data to transmit
        char[] Data = new char[1];
        bool[] CheckedMotors = new bool[14];

        //stores whether or not motors should be on
        bool running = false;

        //stores the number of times specific expressions have been activated
        int[] expressions = new int[4];
        int[] individuals = new int[14];

        Random random_gen = new Random(DateTime.Now.Millisecond);

        // Find the serial port where the device is connected
        RegistryKey RegKey;

        // Was Shift pressed
        bool ShiftWasPressed = false;

        // Delegates to handle callback from the serial port thread
        delegate void SetOnTimeCallback(int Data);
        delegate void SetDutyCycleCallback(int Data);

        // Data logging
        string DataDir = @"..\..\..\Localization Data\";
        FileStream FS;
        StreamWriter SW;

        // Randomized input
        Random R;
        int TrialCounter;

        // Time capture
        DateTime StartTime, EndTime;

        // Accelerometer
        private ZStar3 theZStar = new ZStar3();     
        private ZStarSensor theSensor = null;
        bool ShouldBeRecordingData;
        string AcclDataDir = @"..\..\..\Accelerometer Data\";
        FileStream FS1;
        StreamWriter SW1;
        int AcclCounter;
        DateTime ConnectionTime, StartTimeStamp;
        string DirWithLblOnPhlange;
        List<string> ListOfStrings;

        #endregion

        public Form1()
        {
            R = new Random();
            StartTime = new DateTime();
            EndTime = new DateTime();

            // Initialize one sensor
            theSensor = theZStar.GetSensor(0);      // 4. step: Assign right sensor that you want to use (or all for array of 16 elements)

            InitializeComponent();

            // Flag to notify when the vibrators are buzzing
            ShouldBeRecordingData = false;

            // Event when new burst data was received
            theZStar.OnBurstDataReceived += new ZStar3.OnBurstDataReceivedHandler(theZStar_OnBurstDataReceived);
            // Event that occur when list of Active sensor was changed
            theZStar.OnActiveSensorsChanged += new ZStar3.OnActiveSensorsChangedHandler(theZStar_OnActiveSensorsChanged);
            // Event that occur if ZStarLib lost Connection on Comport
            theZStar.OnConnectionLost += new ZStar3.OnConnectionLostHandler(theZStar_OnConnectionLost);



            // Initiate Counter to 0
            AcclCounter = 0;
            ListOfStrings = new List<string>();
        }

        // One form load, open serial port
        private void Form1_Load(object sender, EventArgs e)
        {
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
                        ComPort = (string) RegKey.GetValue(SerialPortStr);                          
                    }
                }

                // If the virtual serial port was found, open the port
                if (ComPort != null)
                {
                    serialPort1.PortName = ComPort;
                    serialPort1.Open();
                    Thread.Sleep(100);
                    Data[0] = 'r';
                    serialPort1.Write(Data, 0, 1);
                }
                else
                {
                    MessageBox.Show("No Virtual Serial Port found");
                    checkBox1.Enabled = false;
                    checkBox2.Enabled = false;
                    checkBox3.Enabled = false;
                    checkBox4.Enabled = false;
                    checkBox5.Enabled = false;
                    checkBox6.Enabled = false;
                    checkBox7.Enabled = false;
                    checkBox8.Enabled = false;
                    checkBox9.Enabled = false;
                    checkBox10.Enabled = false;
                    checkBox11.Enabled = false;
                    checkBox12.Enabled = false;
                    checkBox13.Enabled = false;
                    checkBox14.Enabled = false;
                    groupBox1.Enabled = false;
                    groupBox2.Enabled = false;
                    groupBox3.Enabled = false;
                }
            }
            catch (Exception exp)
            {
                MessageBox.Show("Error Opening Serial Port: " + exp.Message);
            }            
        }

        // Try writing to the serial port and throw exception if not
        private void serialWrite()
        {
            try
            {
                serialPort1.Write(Data, 0, 1);
                Thread.Sleep(50);
            }
            catch (Exception exp)
            {
                MessageBox.Show("Error writing to serial port: " + exp.Message);
            }
        }

        // On form closing, close the serial port
        private void form_Closing(object sender, FormClosingEventArgs e)
        {
            try
            {
                if (serialPort1.IsOpen)
                {
                    StopAllMotors();
                    serialPort1.DiscardInBuffer();
                    serialPort1.Close();
                }
            }
            catch (Exception exp)
            {
                MessageBox.Show("Error closing serial port: " + exp.Message);
            }

            // Perform Close POrt button
            this.CloseButton.PerformClick();
        }

        #region Vibrator Actuations
        // Following are the 14 vibrators that are mapped to the corresponding areas on the 
        // hand as shown in the image on the main form
        private void checkBox1_CheckedChanged(object sender, EventArgs e)
        {
            //Motor L
            CheckedMotors[11] = checkBox1.Checked;
        }

        private void checkBox2_CheckedChanged(object sender, EventArgs e)
        {
            //Motor M
            CheckedMotors[12] = checkBox2.Checked;
        }

        private void checkBox3_CheckedChanged(object sender, EventArgs e)
        {
            //Motor N
            CheckedMotors[13] = checkBox3.Checked;
        }

        private void checkBox4_CheckedChanged(object sender, EventArgs e)
        {
            //Motor I
            CheckedMotors[8] = checkBox4.Checked;
        }

        private void checkBox5_CheckedChanged(object sender, EventArgs e)
        {
            //Motor J
            CheckedMotors[9] = checkBox5.Checked;
        }

        private void checkBox6_CheckedChanged(object sender, EventArgs e)
        {
            //Motor K
            CheckedMotors[10] = checkBox6.Checked;
        }

        private void checkBox7_CheckedChanged(object sender, EventArgs e)
        {
            //Motor F
            CheckedMotors[5] = checkBox7.Checked;
        }

        private void checkBox8_CheckedChanged(object sender, EventArgs e)
        {
            //Motor G
            CheckedMotors[6] = checkBox8.Checked;
        }

        private void checkBox9_CheckedChanged(object sender, EventArgs e)
        {
            //Motor H
            CheckedMotors[7] = checkBox9.Checked;
        }

        private void checkBox10_CheckedChanged(object sender, EventArgs e)
        {
            //Motor C
            CheckedMotors[2] = checkBox10.Checked;
        }

        private void checkBox11_CheckedChanged(object sender, EventArgs e)
        {
            //Motor D
            CheckedMotors[3] = checkBox11.Checked;
        }

        private void checkBox12_CheckedChanged(object sender, EventArgs e)
        {
            //Motor E
            CheckedMotors[4] = checkBox12.Checked;
        }

        private void checkBox13_CheckedChanged(object sender, EventArgs e)
        {
            //Motor B
            CheckedMotors[1] = checkBox13.Checked;
        }

        private void checkBox14_CheckedChanged(object sender, EventArgs e)
        {
            //Motor A
            CheckedMotors[0] = checkBox14.Checked;
        }
        #endregion
        
        private void SerialDataRecv(object sender, System.IO.Ports.SerialDataReceivedEventArgs e)
        {
            try
            {
                string ReadLine = serialPort1.ReadLine();

                if (ReadLine.Contains("On Time"))
                {
                    int IndexOn = ReadLine.IndexOf("(ms):");
                    string TempOn = ReadLine.Substring(IndexOn + 6, 2);
                    int ONTIME = Convert.ToInt32(TempOn);

                    ReadLine = serialPort1.ReadLine();
                    int IndexOff = ReadLine.IndexOf("(ms):");
                    string TempOff = ReadLine.Substring(IndexOff + 6, 2);
                    int OFFTIME = Convert.ToInt32(TempOff);

                    setOnTime (ONTIME);

                    setDutyCycle(Convert.ToInt32((Convert.ToDouble(ONTIME) / Convert.ToDouble(ONTIME + OFFTIME)) * 10));
                }
            }
            catch (Exception exp)
            {
            }     

        }

        private void setDutyCycle(int Data)
        {
            if (this.trackBar2.InvokeRequired)
            {
                SetDutyCycleCallback d = new SetDutyCycleCallback(setDutyCycle);

                this.Invoke(d, new object[] { Data });
            }
            else
            {
                this.trackBar2.Value = Data;
                int Res = (Data) * 10;
                this.textBox2.Text = Res.ToString();
            }

         }

        private void setOnTime(int Data)
        {
            if (this.trackBar1.InvokeRequired)
            {
                SetOnTimeCallback d = new SetOnTimeCallback(setOnTime);
                this.Invoke(d, new object[] { Data });
            }
            else
            {
                this.trackBar1.Value = Data;
                this.textBox1.Text = Data.ToString();
            }
         }

        private void trackBar1_Scroll(object sender, EventArgs e)
        {
            int ONTIME = trackBar1.Value;
            double Factor = (Convert.ToDouble(trackBar2.Value) / 10.0);
            int OFFTIME = Convert.ToInt32((1 - Factor) * ONTIME / Factor);
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
                Data[0] = 'x';
               this.serialWrite();

                // Convert ONTIME to charecters
                Data[0] = Convert.ToChar((ONTIME / 10) + 48);
                this.serialWrite();

                Data[0] = Convert.ToChar((ONTIME - ((ONTIME / 10) * 10)) + 48);
                this.serialWrite();

                this.textBox1.Text = ONTIME.ToString();

                // Convert OFFTIME to charecters
                Data[0] = Convert.ToChar((OFFTIME / 10) + 48);
                this.serialWrite();

                Data[0] = Convert.ToChar((OFFTIME - ((OFFTIME / 10) * 10)) + 48);
                this.serialWrite();
                
            }
        }

        private void trackBar2_Scroll(object sender, EventArgs e)
        {
            int Temp = trackBar2.Value;
            int DutyCycle = (Temp * 10);
            this.textBox2.Text = DutyCycle.ToString();
            
            int ONTIME = trackBar1.Value;
            double Factor = (Convert.ToDouble(trackBar2.Value) / 10.0);
            int OFFTIME = Convert.ToInt32((1 - Factor) * ONTIME / Factor);

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
                Data[0] = 'x';
                this.serialWrite();

                // Convert ONTIME to charecters
                Data[0] = Convert.ToChar((ONTIME / 10) + 48);
                this.serialWrite();

                Data[0] = Convert.ToChar((ONTIME - ((ONTIME / 10) * 10)) + 48);
                this.serialWrite();

                this.textBox1.Text = ONTIME.ToString();

                // Convert OFFTIME to charecters
                Data[0] = Convert.ToChar((OFFTIME / 10) + 48);
                this.serialWrite();

                Data[0] = Convert.ToChar((OFFTIME - ((OFFTIME / 10) * 10)) + 48);
                this.serialWrite();
            }
        }

        private void StopAllMotors()
        {
            string motorstop = "abcdefghijklmn";

            for (int i = 0; i < 14; i++)
            {
                Data[0] = motorstop[i];
                serialWrite();
            }

        }

        // Capture Keyboard strokes to determine which motor should be On/Off
        protected override bool ProcessDialogKey(Keys keyData)
        {
            System.Console.WriteLine(Convert.ToInt32(keyData));

            if (keyData == Keys.A && ShiftWasPressed)
            {
                this.checkBox1.Checked = true;
             
            }


            return base.ProcessDialogKey(keyData);
        }

        private void button1_Click(object sender, EventArgs e)
        {
            timer1.Interval = int.Parse(textBox3.Text);
            timer1.Enabled = true;
            StartSingleButton.Enabled = false;
            //used as a check for ensuring motors are only running when the must
            running = true;
            start_at_once();
        }

        private void start_at_once()
        {
            if (running)
            {
                timer1.Start();
                for (int i = 0; i < CheckedMotors.Length; i++)
                {
                    if (CheckedMotors[i])
                    {
                        Data[0] = (char)(i + 65);
                        serialWrite();
                    }
                }
            }
        }

        private void start_hold(int interval, int repeat)
        {
            if (running)
            {
                for (int j = 0; j < repeat; j++)
                {
                    for (int i = 0; i < CheckedMotors.Length; i++)
                    {
                        if (CheckedMotors[i])
                        {
                            Data[0] = (char)(i + 65);
                            serialWrite();
                            System.Threading.Thread.Sleep(interval);
                        }
                    }
                }
                timer1.Start();
            }
        }

        

        private void timer1_Tick(object sender, EventArgs e)
        {
            //enables the buttons and resumes normal execution once work is done
            running = false;
            StopAllMotors();
            timer1.Enabled = false;
            StartSingleButton.Enabled = true;
            NextButton.Enabled = true;
            
        }




        private void button6_Click(object sender, EventArgs e)
        {
            clear_all();
        }



        private void clear_all()
        {
            StopAllMotors();
            checkBox1.Checked = false;
            checkBox2.Checked = false;
            checkBox3.Checked = false;
            checkBox4.Checked = false;
            checkBox5.Checked = false;
            checkBox6.Checked = false;
            checkBox7.Checked = false;
            checkBox8.Checked = false;
            checkBox9.Checked = false;
            checkBox10.Checked = false;
            checkBox11.Checked = false;
            checkBox12.Checked = false;
            checkBox13.Checked = false;
            checkBox14.Checked = false;
        }
        

        // Randomize Start Button
        private void button2_Click_1(object sender, EventArgs e)
        {
            string FileName = DataDir + this.textBox7.Text + DateTime.Today.ToString("dd_MM_yy_") + DateTime.Now.Hour.ToString() +
                                "_" + DateTime.Now.Minute.ToString() + "_" + DateTime.Now.Second.ToString() + ".txt";
            FS = new FileStream(FileName, FileMode.OpenOrCreate, FileAccess.Write);
            SW = new StreamWriter(FS);

            textBox4.Enabled = false;
            StartRandButton.Enabled = false;
            textBox7.Enabled = false;
            textBox6.Enabled = true;
            NextButton.Enabled = true;

            TrialCounter = Convert.ToInt16(textBox4.Text) * 14 - 1;
            TrialCountBox.Text = TrialCounter.ToString();
            VibrateRandomMotor();            

        }

        // Vibrate some random motor
        private void VibrateRandomMotor()
        {
            int MotorNo = R.Next(14);
            StartTime = DateTime.Now;
            Data[0] = (char)(MotorNo + 65);            
            textBox5.Text = Data[0].ToString();
            SW.Write(Data[0].ToString() + " ");
            SW.Flush();
            serialWrite();

            timer1.Interval = Convert.ToInt16(textBox3.Text);
            timer1.Start();
            NextButton.Enabled = false;
            textBox6.Focus();
        }

        private void NextButton_Click(object sender, EventArgs e)
        {
            EndTime = DateTime.Now;
            TimeSpan TS = EndTime - StartTime;
            double Duration = Convert.ToDouble(TS.Duration().Ticks) / 10000;            
            SW.WriteLine(textBox6.Text + " " + Duration.ToString());
            SW.Flush();
            if (TrialCounter > 0)
            {
                textBox6.Text = "";
                VibrateRandomMotor();
                TrialCounter--;
                TrialCountBox.Text = TrialCounter.ToString();
            }
            else
            {
                textBox4.Enabled = true;
                StartRandButton.Enabled = true;
                textBox7.Enabled = true;
                textBox6.Enabled = false;
                NextButton.Enabled = false;
                SW.Close();
                FS.Close();
            }
        }

        #region ZStar Event Handlers
        // List Of Active sensor was changed
        void theZStar_OnActiveSensorsChanged(object sender, byte sensor)
        {
            // Is first sensor present???
            if ((theZStar.ActiveSensorsMask & 0x0001) == 0x0001)
            {
                // Enable  Burst Data Receive for this sensor 
                theSensor.BurstDataReceiveEnable = true;
                // Enable global Burst mode 
                theZStar.BurstModeEnabled = true;

                // Record the time of connection
                ConnectionTime = DateTime.Now;

                

                Statuslabel.Text = "Status: Connected";
            }
            else // Sensor index 0 is not connected            
            {
                // Disable  Burst Data Receive for this sensor
                theSensor.BurstDataReceiveEnable = false;
                // Disable global Burst mode
                theZStar.BurstModeEnabled = false;
                Statuslabel.Text = "Status: Disconnected";
            }
        }

        // ZStarLib lost connection with ZStar hardware
        void theZStar_OnConnectionLost(object sender)
        {
            // Perform Close port button
            this.CloseButton.PerformClick();
            // Show Error Message
            MessageBox.Show("ComPort connection lost!", "ZStarLib connection", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }

        // New Burst data was received
        void theZStar_OnBurstDataReceived(object sender, byte sensor)
        {
            // Are these data from our sensor 0
            if (sensor == 0 && running)
            {
                while (theSensor.GetBurstData()) // Get all pending data in Burst Data FIFO Buffer
                {

                    // Record to the file
                    string WriteStr = theSensor.BurstTimeText+ " " + Convert.ToString(theSensor.RealX) + " " +
                        Convert.ToString(theSensor.RealY) + " " +
                        Convert.ToString(theSensor.RealZ);
                    ListOfStrings.Add(WriteStr);
                }

            }
            else if (sensor == 0 && !running)
            {
                while (theSensor.GetBurstData()) // Get all pending data in Burst Data FIFO Buffer
                {
                    // Record to the file
                    string WriteStr = theSensor.BurstTimeText + " " + Convert.ToString(theSensor.RealX) + " " +
                        Convert.ToString(theSensor.RealY) + " " +
                        Convert.ToString(theSensor.RealZ);
                }
            }
        }

 
        #endregion

        private void Refreshbutton_Click(object sender, EventArgs e)
        {
            // Get all ComPorts in PC
            ComPortInfo[] ports = ZStar3.GetComPorts();

            // Clear ListBox of Comports
            comboBox.Items.Clear();

            // walk through all Comports
            foreach (ComPortInfo p in ports)
            {
                // Add each to Comport list
                int ix = comboBox.Items.Add(p);

                // Check name and look for ZSTAR device
                if (p.FriendlyName.Contains("ZSTAR"))
                {
                    // remember last index of ZSTAR port
                    comboBox.SelectedIndex = ix;
                }
            }

            // If ZSTAR ComPort wasn't found 
            if (comboBox.SelectedIndex == -1)
            {
                // Select first in List
                comboBox.SelectedIndex = 0;
            }

        }

        private void OpenButton_Click(object sender, EventArgs e)
        {
            // Check ZStarLib ComPort status and selected item in List box
            if (!theZStar.IsPortOpen && comboBox.SelectedItem != null)
            {
                // If ComPort exist and ZStarLib has closed port
                // Try to open selected port
                if (!theZStar.OpenPort(((ComPortInfo)comboBox.SelectedItem).PortNum))
                {
                    // If Failed, show Error message 
                    MessageBox.Show("OpenPort failed!", "ZStarLib connection", MessageBoxButtons.OK, MessageBoxIcon.Asterisk);
                    // And go out
                    return;
                }

                // Check USB_Stick type (has to be known!!)
                if (theZStar.ZStarUsbStickType == ZStar3.UsbStickType.Unknown)
                {
                    // Unknown USB Stick type
                    // Close opened port
                    theZStar.ClosePort();
                    // And show Error Message
                    MessageBox.Show("This is not ZStar3 Device!!!");
                    return;
                }

                // Disable / Enable all depends objects

                // SetUp Enable of all controls on form
                comboBox.Enabled = false;
                this.Refreshbutton.Enabled = false;                 
                OpenButton.Enabled = false;
                this.CloseButton.Enabled = true;

                // Disable for all sensor burst data
                theZStar.BurstDataReceiveEnableMask = 0x0000;

                if (!theZStar.DataRateSetAll(ZStar3.DataRate.DataRate_120Hz))
                    MessageBox.Show("Could not set speed to 120Hz");

                // Set the sensor speed to max
                if (theSensor.DataRate == ZStar3.DataRate.DataRate_30Hz)
                    MessageBox.Show("30Hz");
                else if (theSensor.DataRate == ZStar3.DataRate.DataRate_60Hz)
                    MessageBox.Show("60Hz");
                else if (theSensor.DataRate == ZStar3.DataRate.DataRate_120Hz)
                    MessageBox.Show("120Hz");

               

                // Keep new sensors(without power switch) sensor awake up when ZStarLib runs
                theZStar.SleepDisabled = true;
            }
        }

        private void CloseButton_Click(object sender, EventArgs e)
        {
            // Switch of sleepDisabled Sensor capatibilities
            theZStar.SleepDisabled = false;
            // Switch of Burst mode of ZStar 
            theZStar.BurstDataReceiveEnableMask = 0x0000;
            theZStar.BurstModeEnabled = false;

            // Close Port
            theZStar.ClosePort();

            // SetUp Form
            Statuslabel.Text = "Status: Disconnected";
            this.comboBox.Enabled = true;
            this.Refreshbutton.Enabled = true;
            OpenButton.Enabled = true;
            this.CloseButton.Enabled = false;
        }

        private void button1_Click_1(object sender, EventArgs e)
        {
            StartTimeStamp = DateTime.Now;           
            // Make sure the Directory is labelled
            if (textBox9.Text == "" || textBox8.Text == "")
                MessageBox.Show("Please Enter a Dir Label");
            else
            {
                // Create the Top directory if it doesnot exist
                string DirWithLbl = AcclDataDir + textBox9.Text;
                if (!Directory.Exists(DirWithLbl))
                    Directory.CreateDirectory(DirWithLbl);

                // Create the lower directory for the location of the accelerometer
                DirWithLblOnPhlange = DirWithLbl + "\\" + textBox8.Text;
                Directory.CreateDirectory(DirWithLblOnPhlange);

                // Create a file to write the acceleration data
                FS1 = new FileStream(DirWithLblOnPhlange + "\\" + "Data.txt", FileMode.CreateNew, FileAccess.Write);
                SW1 = new StreamWriter(FS1);

                // Disable the start button                
                this.button1.Enabled = false;
                string TimeStr = ConnectionTime.TimeOfDay.Hours.ToString() + " "+
                    ConnectionTime.TimeOfDay.Minutes.ToString() + " " +
                    ConnectionTime.TimeOfDay.Seconds.ToString() + " " +
                    ConnectionTime.TimeOfDay.Milliseconds.ToString();
                SW1.WriteLine(TimeStr);
                TimeStr = StartTimeStamp.Hour.ToString() + " " +
                    StartTimeStamp.Minute.ToString() + " " +
                    StartTimeStamp.Second.ToString() + " " +
                    StartTimeStamp.Millisecond.ToString();
                SW1.WriteLine(TimeStr);
                SW1.WriteLine();
                SW1.Flush();
                running = true;
                NextAcclMotor();
            }
        }

        private void NextAcclMotor ()
        {
            if (AcclCounter == 14)
            {
                // Close the file
                SW1.Close();
                FS1.Close();

                button1.Enabled = true;
                return;
            }

            

            switch (AcclCounter)
            {
                case 0:
                    checkBox1.Checked = true;
                    break;
                case 1:
                    checkBox2.Checked = true;
                    break;
                case 2:
                    checkBox3.Checked = true;
                    break;
                case 3:
                    checkBox4.Checked = true;
                    break;
                case 4:
                    checkBox5.Checked = true;
                    break;
                case 5:
                    checkBox6.Checked = true;
                    break;
                case 6:
                    checkBox7.Checked = true;
                    break;
                case 7:
                    checkBox8.Checked = true;
                    break;
                case 8:
                    checkBox9.Checked = true;
                    break;
                case 9:
                    checkBox10.Checked = true;
                    break;
                case 10:
                    checkBox11.Checked = true;
                    break;
                case 11:
                    checkBox12.Checked = true;
                    break;
                case 12:
                    checkBox13.Checked = true;
                    break;
                case 13:
                    checkBox14.Checked = true;
                    break;
            }

            // Start the motors for 5s
            //running = true;
            Data[0] = (char)(AcclCounter + 65);
            serialWrite();
            this.timer2.Interval = 5000;
            this.timer2.Enabled = true;
        }

        private void timer2_Tick(object sender, EventArgs e)
        {
            timer2.Enabled = false;
            this.StopAllMotors();
            //running = false;
            AcclCounter++;
            string[] processedStrings = new string[3];
            int minute;
            double second;

            for (int i = 0; i < ListOfStrings.Count; i++)
            {
                if (ListOfStrings[i].IndexOf("m, ") < 0)
                {
                    ListOfStrings[i] = "0m, " + ListOfStrings[i];
                }
                processedStrings = ListOfStrings[i].Split(new Char[]{' '}, 3);
                minute = int.Parse(processedStrings[0].Replace("m,", "")) * 60;
                second = double.Parse(processedStrings[1].Replace("s", ""));

                SW1.WriteLine((minute + second).ToString() + " " + processedStrings[2]);
            }
 
            SW1.Flush();

            // Clear all selections
            clear_all();
            ListOfStrings.Clear();

            // Set the timer 3 for a 2 second countdown
            timer3.Interval = 2000;
            timer3.Enabled = true;
        }

        private void timer3_Tick(object sender, EventArgs e)
        {
            timer3.Enabled = false;

            // Go to the next motor vibration
            NextAcclMotor();
        }
    }
}