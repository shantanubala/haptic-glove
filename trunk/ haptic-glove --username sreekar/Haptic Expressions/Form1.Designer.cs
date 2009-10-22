namespace Haptic_Expressions
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.HappyButton = new System.Windows.Forms.Button();
            this.SadButton = new System.Windows.Forms.Button();
            this.SurpriseButton = new System.Windows.Forms.Button();
            this.FearButton = new System.Windows.Forms.Button();
            this.DisgustButton = new System.Windows.Forms.Button();
            this.NeutralButton = new System.Windows.Forms.Button();
            this.AngryButton = new System.Windows.Forms.Button();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.BtwMotorTextBox = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.OnTimeTextBox = new System.Windows.Forms.TextBox();
            this.serialPort1 = new System.IO.Ports.SerialPort(this.components);
            this.trackBar1 = new System.Windows.Forms.TrackBar();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.textBox3 = new System.Windows.Forms.TextBox();
            this.label9 = new System.Windows.Forms.Label();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.checkBox1 = new System.Windows.Forms.CheckBox();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.SubjectNameTextBox = new System.Windows.Forms.TextBox();
            this.label13 = new System.Windows.Forms.Label();
            this.StopButton = new System.Windows.Forms.Button();
            this.label12 = new System.Windows.Forms.Label();
            this.CurrExpTextBox = new System.Windows.Forms.TextBox();
            this.label11 = new System.Windows.Forms.Label();
            this.progressBar1 = new System.Windows.Forms.ProgressBar();
            this.StartButton = new System.Windows.Forms.Button();
            this.label10 = new System.Windows.Forms.Label();
            this.NoOfCyclesTextBox = new System.Windows.Forms.TextBox();
            this.timer1 = new System.Windows.Forms.Timer(this.components);
            this.button1 = new System.Windows.Forms.Button();
            this.button2 = new System.Windows.Forms.Button();
            this.groupBox1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.trackBar1)).BeginInit();
            this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.SuspendLayout();
            // 
            // HappyButton
            // 
            this.HappyButton.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("HappyButton.BackgroundImage")));
            this.HappyButton.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.HappyButton.Location = new System.Drawing.Point(16, 19);
            this.HappyButton.Name = "HappyButton";
            this.HappyButton.Size = new System.Drawing.Size(91, 100);
            this.HappyButton.TabIndex = 0;
            this.HappyButton.UseVisualStyleBackColor = true;
            this.HappyButton.Click += new System.EventHandler(this.HappyButton_Click);
            // 
            // SadButton
            // 
            this.SadButton.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("SadButton.BackgroundImage")));
            this.SadButton.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.SadButton.Location = new System.Drawing.Point(113, 19);
            this.SadButton.Name = "SadButton";
            this.SadButton.Size = new System.Drawing.Size(91, 100);
            this.SadButton.TabIndex = 1;
            this.SadButton.UseVisualStyleBackColor = true;
            this.SadButton.Click += new System.EventHandler(this.SadButton_Click);
            // 
            // SurpriseButton
            // 
            this.SurpriseButton.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("SurpriseButton.BackgroundImage")));
            this.SurpriseButton.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.SurpriseButton.Location = new System.Drawing.Point(208, 19);
            this.SurpriseButton.Name = "SurpriseButton";
            this.SurpriseButton.Size = new System.Drawing.Size(91, 100);
            this.SurpriseButton.TabIndex = 2;
            this.SurpriseButton.UseVisualStyleBackColor = true;
            this.SurpriseButton.Click += new System.EventHandler(this.SurpriseButton_Click);
            // 
            // FearButton
            // 
            this.FearButton.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("FearButton.BackgroundImage")));
            this.FearButton.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.FearButton.Location = new System.Drawing.Point(305, 19);
            this.FearButton.Name = "FearButton";
            this.FearButton.Size = new System.Drawing.Size(91, 100);
            this.FearButton.TabIndex = 3;
            this.FearButton.UseVisualStyleBackColor = true;
            this.FearButton.Click += new System.EventHandler(this.FearButton_Click);
            // 
            // DisgustButton
            // 
            this.DisgustButton.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("DisgustButton.BackgroundImage")));
            this.DisgustButton.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.DisgustButton.Location = new System.Drawing.Point(402, 19);
            this.DisgustButton.Name = "DisgustButton";
            this.DisgustButton.Size = new System.Drawing.Size(91, 100);
            this.DisgustButton.TabIndex = 4;
            this.DisgustButton.UseVisualStyleBackColor = true;
            this.DisgustButton.Click += new System.EventHandler(this.DisgustButton_Click);
            // 
            // NeutralButton
            // 
            this.NeutralButton.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("NeutralButton.BackgroundImage")));
            this.NeutralButton.Location = new System.Drawing.Point(596, 19);
            this.NeutralButton.Name = "NeutralButton";
            this.NeutralButton.Size = new System.Drawing.Size(91, 100);
            this.NeutralButton.TabIndex = 5;
            this.NeutralButton.UseVisualStyleBackColor = true;
            this.NeutralButton.Click += new System.EventHandler(this.NeutralButton_Click);
            // 
            // AngryButton
            // 
            this.AngryButton.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("AngryButton.BackgroundImage")));
            this.AngryButton.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.AngryButton.Location = new System.Drawing.Point(499, 19);
            this.AngryButton.Name = "AngryButton";
            this.AngryButton.Size = new System.Drawing.Size(91, 100);
            this.AngryButton.TabIndex = 6;
            this.AngryButton.UseVisualStyleBackColor = true;
            this.AngryButton.Click += new System.EventHandler(this.AngryButton_Click);
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.NeutralButton);
            this.groupBox1.Controls.Add(this.AngryButton);
            this.groupBox1.Controls.Add(this.DisgustButton);
            this.groupBox1.Controls.Add(this.label4);
            this.groupBox1.Controls.Add(this.FearButton);
            this.groupBox1.Controls.Add(this.label3);
            this.groupBox1.Controls.Add(this.SurpriseButton);
            this.groupBox1.Controls.Add(this.label2);
            this.groupBox1.Controls.Add(this.SadButton);
            this.groupBox1.Controls.Add(this.BtwMotorTextBox);
            this.groupBox1.Controls.Add(this.HappyButton);
            this.groupBox1.Controls.Add(this.label1);
            this.groupBox1.Controls.Add(this.OnTimeTextBox);
            this.groupBox1.Location = new System.Drawing.Point(8, 13);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(697, 269);
            this.groupBox1.TabIndex = 7;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Expressions";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(205, 209);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(20, 13);
            this.label4.TabIndex = 13;
            this.label4.Text = "ms";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(177, 179);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(20, 13);
            this.label3.TabIndex = 12;
            this.label3.Text = "ms";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(26, 209);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(113, 13);
            this.label2.TabIndex = 11;
            this.label2.Text = "Time Between Motors:";
            // 
            // BtwMotorTextBox
            // 
            this.BtwMotorTextBox.Location = new System.Drawing.Point(142, 206);
            this.BtwMotorTextBox.Name = "BtwMotorTextBox";
            this.BtwMotorTextBox.Size = new System.Drawing.Size(57, 20);
            this.BtwMotorTextBox.TabIndex = 10;
            this.BtwMotorTextBox.Text = "20";
            this.BtwMotorTextBox.TextChanged += new System.EventHandler(this.textBox2_TextChanged);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(26, 179);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(80, 13);
            this.label1.TabIndex = 9;
            this.label1.Text = "Motor On Time:";
            // 
            // OnTimeTextBox
            // 
            this.OnTimeTextBox.Location = new System.Drawing.Point(112, 176);
            this.OnTimeTextBox.Name = "OnTimeTextBox";
            this.OnTimeTextBox.Size = new System.Drawing.Size(59, 20);
            this.OnTimeTextBox.TabIndex = 8;
            this.OnTimeTextBox.Text = "250";
            this.OnTimeTextBox.TextChanged += new System.EventHandler(this.textBox1_TextChanged);
            // 
            // serialPort1
            // 
            this.serialPort1.BaudRate = 19200;
            // 
            // trackBar1
            // 
            this.trackBar1.Location = new System.Drawing.Point(12, 39);
            this.trackBar1.Maximum = 30;
            this.trackBar1.Name = "trackBar1";
            this.trackBar1.Size = new System.Drawing.Size(201, 45);
            this.trackBar1.TabIndex = 14;
            this.trackBar1.Value = 15;
            this.trackBar1.Scroll += new System.EventHandler(this.trackBar1_Scroll);
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(16, 20);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(92, 13);
            this.label5.TabIndex = 15;
            this.label5.Text = "On time per cycle:";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(17, 79);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(13, 13);
            this.label6.TabIndex = 16;
            this.label6.Text = "0";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(191, 79);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(19, 13);
            this.label7.TabIndex = 17;
            this.label7.Text = "30";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(106, 79);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(19, 13);
            this.label8.TabIndex = 18;
            this.label8.Text = "15";
            // 
            // textBox3
            // 
            this.textBox3.Location = new System.Drawing.Point(219, 39);
            this.textBox3.Name = "textBox3";
            this.textBox3.Size = new System.Drawing.Size(55, 20);
            this.textBox3.TabIndex = 19;
            this.textBox3.Text = "15";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Location = new System.Drawing.Point(280, 42);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(20, 13);
            this.label9.TabIndex = 20;
            this.label9.Text = "ms";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.label9);
            this.groupBox2.Controls.Add(this.textBox3);
            this.groupBox2.Controls.Add(this.label8);
            this.groupBox2.Controls.Add(this.label7);
            this.groupBox2.Controls.Add(this.label6);
            this.groupBox2.Controls.Add(this.label5);
            this.groupBox2.Controls.Add(this.trackBar1);
            this.groupBox2.Enabled = false;
            this.groupBox2.Location = new System.Drawing.Point(384, 162);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(309, 107);
            this.groupBox2.TabIndex = 21;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Intensity Control";
            // 
            // checkBox1
            // 
            this.checkBox1.AutoSize = true;
            this.checkBox1.Location = new System.Drawing.Point(260, 204);
            this.checkBox1.Name = "checkBox1";
            this.checkBox1.Size = new System.Drawing.Size(118, 17);
            this.checkBox1.TabIndex = 22;
            this.checkBox1.Text = "Intensity Control On";
            this.checkBox1.UseVisualStyleBackColor = true;
            this.checkBox1.CheckedChanged += new System.EventHandler(this.checkBox1_CheckedChanged);
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.button2);
            this.groupBox3.Controls.Add(this.button1);
            this.groupBox3.Controls.Add(this.SubjectNameTextBox);
            this.groupBox3.Controls.Add(this.label13);
            this.groupBox3.Controls.Add(this.StopButton);
            this.groupBox3.Controls.Add(this.label12);
            this.groupBox3.Controls.Add(this.CurrExpTextBox);
            this.groupBox3.Controls.Add(this.label11);
            this.groupBox3.Controls.Add(this.progressBar1);
            this.groupBox3.Controls.Add(this.StartButton);
            this.groupBox3.Controls.Add(this.label10);
            this.groupBox3.Controls.Add(this.NoOfCyclesTextBox);
            this.groupBox3.Location = new System.Drawing.Point(8, 299);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(697, 94);
            this.groupBox3.TabIndex = 23;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Randomize and Deliver Expressions with Response Recording";
            // 
            // SubjectNameTextBox
            // 
            this.SubjectNameTextBox.Location = new System.Drawing.Point(402, 54);
            this.SubjectNameTextBox.Name = "SubjectNameTextBox";
            this.SubjectNameTextBox.Size = new System.Drawing.Size(100, 20);
            this.SubjectNameTextBox.TabIndex = 9;
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Location = new System.Drawing.Point(353, 57);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(43, 13);
            this.label13.TabIndex = 8;
            this.label13.Text = "Subject";
            // 
            // StopButton
            // 
            this.StopButton.Location = new System.Drawing.Point(107, 59);
            this.StopButton.Name = "StopButton";
            this.StopButton.Size = new System.Drawing.Size(60, 29);
            this.StopButton.TabIndex = 7;
            this.StopButton.Text = "Stop";
            this.StopButton.UseVisualStyleBackColor = true;
            this.StopButton.Click += new System.EventHandler(this.StopButton_Click);
            // 
            // label12
            // 
            this.label12.AutoSize = true;
            this.label12.Location = new System.Drawing.Point(301, 31);
            this.label12.Name = "label12";
            this.label12.Size = new System.Drawing.Size(95, 13);
            this.label12.TabIndex = 6;
            this.label12.Text = "Current Expression";
            // 
            // CurrExpTextBox
            // 
            this.CurrExpTextBox.Enabled = false;
            this.CurrExpTextBox.Location = new System.Drawing.Point(402, 28);
            this.CurrExpTextBox.Name = "CurrExpTextBox";
            this.CurrExpTextBox.Size = new System.Drawing.Size(100, 20);
            this.CurrExpTextBox.TabIndex = 5;
            // 
            // label11
            // 
            this.label11.AutoSize = true;
            this.label11.Location = new System.Drawing.Point(521, 25);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(51, 13);
            this.label11.TabIndex = 4;
            this.label11.Text = "Progress:";
            // 
            // progressBar1
            // 
            this.progressBar1.Enabled = false;
            this.progressBar1.Location = new System.Drawing.Point(524, 41);
            this.progressBar1.Name = "progressBar1";
            this.progressBar1.Size = new System.Drawing.Size(152, 23);
            this.progressBar1.TabIndex = 3;
            // 
            // StartButton
            // 
            this.StartButton.Location = new System.Drawing.Point(29, 59);
            this.StartButton.Name = "StartButton";
            this.StartButton.Size = new System.Drawing.Size(60, 29);
            this.StartButton.TabIndex = 2;
            this.StartButton.Text = "Start";
            this.StartButton.UseVisualStyleBackColor = true;
            this.StartButton.Click += new System.EventHandler(this.StartButton_Click);
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Location = new System.Drawing.Point(13, 31);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(108, 13);
            this.label10.TabIndex = 1;
            this.label10.Text = "Number of Deliveries:";
            // 
            // NoOfCyclesTextBox
            // 
            this.NoOfCyclesTextBox.Location = new System.Drawing.Point(127, 28);
            this.NoOfCyclesTextBox.Name = "NoOfCyclesTextBox";
            this.NoOfCyclesTextBox.Size = new System.Drawing.Size(40, 20);
            this.NoOfCyclesTextBox.TabIndex = 0;
            this.NoOfCyclesTextBox.Text = "2";
            // 
            // timer1
            // 
            this.timer1.Interval = 5000;
            this.timer1.Tick += new System.EventHandler(this.timer1_Tick);
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(198, 31);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(75, 23);
            this.button1.TabIndex = 10;
            this.button1.Text = "Start Sound";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // button2
            // 
            this.button2.Location = new System.Drawing.Point(199, 64);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(75, 23);
            this.button2.TabIndex = 11;
            this.button2.Text = "End Sound";
            this.button2.UseVisualStyleBackColor = true;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(717, 406);
            this.Controls.Add(this.groupBox3);
            this.Controls.Add(this.checkBox1);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Name = "Form1";
            this.Text = "Haptic Expressions ";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Form1_KeyDown);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.trackBar1)).EndInit();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button HappyButton;
        private System.Windows.Forms.Button SadButton;
        private System.Windows.Forms.Button SurpriseButton;
        private System.Windows.Forms.Button FearButton;
        private System.Windows.Forms.Button DisgustButton;
        private System.Windows.Forms.Button NeutralButton;
        private System.Windows.Forms.Button AngryButton;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.TextBox OnTimeTextBox;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox BtwMotorTextBox;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.IO.Ports.SerialPort serialPort1;
        private System.Windows.Forms.TrackBar trackBar1;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.TextBox textBox3;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.CheckBox checkBox1;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.TextBox NoOfCyclesTextBox;
        private System.Windows.Forms.Button StartButton;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.Timer timer1;
        private System.Windows.Forms.ProgressBar progressBar1;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.Label label12;
        private System.Windows.Forms.TextBox CurrExpTextBox;
        private System.Windows.Forms.Button StopButton;
        private System.Windows.Forms.TextBox SubjectNameTextBox;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.Button button1;
    }
}

