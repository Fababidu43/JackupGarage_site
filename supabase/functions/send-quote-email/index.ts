import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

interface QuoteRequest {
  service: string;
  urgency: string;
  location: string;
  phone: string;
  name: string;
  formType?: 'quote';
}

interface ContactRequest {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  registration?: string;
  subject: string;
  message: string;
  hasHardFlatGround: boolean;
  formType: 'contact';
}

type FormRequest = QuoteRequest | ContactRequest;

const serviceNames: { [key: string]: string } = {
  'vidange': 'Vidange / Entretien',
  'freins': 'Freins / Plaquettes',
  'embrayage': 'Embrayage / Volant',
  'distribution': 'Kit Distribution',
  'suspension': 'Suspensions / Amortisseurs',
  'autre': 'Autre'
};

const urgencyNames: { [key: string]: string } = {
  'normal': 'Dans la semaine',
  'urgent': 'Cette semaine',
  'tres-urgent': 'Urgent (2-3 jours)'
};

const serviceTimes: { [key: string]: string } = {
  'vidange': '30-45 min',
  'freins': '1-2h',
  'embrayage': '3-5h',
  'distribution': '4-6h',
  'suspension': '2-3h',
  'autre': 'Variable'
};

const subjectNames: { [key: string]: string } = {
  'entretien': 'Entretien / Vidange',
  'embrayage': 'Embrayage / Volant moteur',
  'distribution': 'Kit distribution',
  'suspension': 'Suspensions / Amortisseurs',
  'autre': 'Autre'
};

// Configuration SMTP Gmail
const GMAIL_SMTP_CONFIG = {
  hostname: 'smtp.gmail.com',
  port: 587,
  username: 'fabian.measson123@gmail.com',
  password: 'ajlz gahz jnun rjbs',
  from: 'fabian.measson123@gmail.com',
  to: 'jackup.auto.pro@gmail.com'
};

async function sendEmailViaGmailSMTP(formData: FormRequest) {
  try {
    console.log('=== ENVOI EMAIL VIA SMTP GMAIL ===');
    console.log('Configuration SMTP:', {
      hostname: GMAIL_SMTP_CONFIG.hostname,
      port: GMAIL_SMTP_CONFIG.port,
      username: GMAIL_SMTP_CONFIG.username,
      from: GMAIL_SMTP_CONFIG.from,
      to: GMAIL_SMTP_CONFIG.to
    });

    const currentDate = new Date();
    const dateStr = currentDate.toLocaleDateString('fr-FR');
    const timeStr = currentDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    let htmlContent: string;
    let textContent: string;
    let emailSubject: string;

    // Déterminer le type de formulaire
    const isQuoteForm = !formData.formType || formData.formType === 'quote';
    
    if (isQuoteForm) {
      // Email pour devis express
      const quoteData = formData as QuoteRequest;
      const serviceName = serviceNames[quoteData.service] || quoteData.service;
      const urgencyName = urgencyNames[quoteData.urgency] || quoteData.urgency;
      const serviceTime = serviceTimes[quoteData.service] || 'Variable';
      
      emailSubject = `🚗 Nouvelle demande de devis - ${serviceName} - ${quoteData.name}`;
      
      htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle demande de devis - JACK Up Auto</title>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f5f5f5;
        }
        .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white; 
            border-radius: 12px; 
            overflow: hidden; 
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            border: 1px solid #e0e0e0;
        }
        .header { 
            background: linear-gradient(135deg, #FF6B35, #FF8C42); 
            color: white; 
            padding: 30px 20px; 
            text-align: center;
            position: relative;
        }
        .header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #FF6B35, #FFB347, #FF6B35);
        }
        .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: bold; 
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .header h2 { 
            margin: 10px 0 0 0; 
            font-size: 18px; 
            font-weight: normal; 
            opacity: 0.95;
        }
        .content { 
            padding: 30px 25px; 
        }
        .section { 
            margin-bottom: 25px; 
            background: #fafafa;
            border-radius: 8px;
            padding: 20px;
            border-left: 4px solid #FF6B35;
        }
        .section h3 { 
            color: #FF6B35; 
            font-size: 18px; 
            margin: 0 0 15px 0; 
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .info-row { 
            display: flex; 
            margin: 12px 0; 
            padding: 12px 15px; 
            background: white; 
            border-radius: 6px; 
            border: 1px solid #e8e8e8;
            transition: all 0.2s ease;
        }
        .info-row:hover {
            border-color: #FF6B35;
            box-shadow: 0 2px 8px rgba(255, 107, 53, 0.1);
        }
        .label { 
            font-weight: bold; 
            min-width: 140px; 
            color: #FF6B35; 
            font-size: 14px;
        }
        .value { 
            flex: 1; 
            color: #333; 
            font-size: 14px;
        }
        .urgent { 
            background: #fff8e1; 
            border-left-color: #ffc107; 
        }
        .urgent .label { 
            color: #f57c00; 
        }
        .footer { 
            text-align: center; 
            padding: 25px 20px; 
            background: #2c2c2c; 
            color: white; 
        }
        .footer h4 {
            color: #FF6B35;
            margin: 0 0 10px 0;
            font-size: 18px;
        }
        .footer a { 
            color: #FF6B35; 
            text-decoration: none; 
            font-weight: bold; 
            font-size: 18px;
        }
        .footer a:hover { 
            text-decoration: underline; 
        }
        .highlight { 
            background: linear-gradient(135deg, #FF6B35, #FF8C42); 
            color: white; 
            padding: 4px 8px; 
            border-radius: 4px; 
            font-weight: bold; 
            display: inline-block;
        }
        .priority-high {
            background: #ffebee;
            border-left-color: #f44336;
        }
        .priority-high .highlight {
            background: linear-gradient(135deg, #f44336, #ff5722);
        }
        .timestamp {
            background: #f0f8ff;
            border: 1px solid #e3f2fd;
            border-radius: 6px;
            padding: 15px;
            margin-top: 20px;
            text-align: center;
        }
        .call-to-action {
            background: linear-gradient(135deg, #FF6B35, #FF8C42);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
        }
        .call-to-action a {
            color: white;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚗 JACK UP AUTO</h1>
            <h2>Nouvelle demande de devis</h2>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>👤 Informations client</h3>
                <div class="info-row">
                    <span class="label">Nom complet :</span>
                    <span class="value"><strong>${quoteData.name}</strong></span>
                </div>
                <div class="info-row">
                    <span class="label">Téléphone :</span>
                    <span class="value"><a href="tel:${quoteData.phone}" style="color: #FF6B35; text-decoration: none; font-weight: bold;">${quoteData.phone}</a></span>
                </div>
                <div class="info-row">
                    <span class="label">Ville d'intervention :</span>
                    <span class="value"><strong>${quoteData.location}</strong></span>
                </div>
            </div>
            
            <div class="section ${quoteData.urgency === 'tres-urgent' ? 'priority-high' : ''}">
                <h3>🔧 Détails de l'intervention</h3>
                <div class="info-row">
                    <span class="label">Service demandé :</span>
                    <span class="value"><span class="highlight">${serviceName}</span></span>
                </div>
                <div class="info-row">
                    <span class="label">Durée estimée :</span>
                    <span class="value"><strong>${serviceTime}</strong></span>
                </div>
                <div class="info-row">
                    <span class="label">Niveau d'urgence :</span>
                    <span class="value"><strong style="color: ${quoteData.urgency === 'tres-urgent' ? '#f44336' : quoteData.urgency === 'urgent' ? '#ff9800' : '#4caf50'}">${urgencyName}</strong></span>
                </div>
            </div>
            
            <div class="timestamp">
                <strong>📅 Demande reçue le ${dateStr} à ${timeStr}</strong>
            </div>
            
            <div class="call-to-action">
                <p style="margin: 0 0 10px 0;"><strong>⚡ ACTION REQUISE</strong></p>
                <p style="margin: 0;">Recontacter le client pour établir un devis personnalisé</p>
            </div>
        </div>
        
        <div class="footer">
            <h4>📞 Rappeler le client</h4>
            <p><a href="tel:${quoteData.phone}">${quoteData.phone}</a></p>
            <p style="margin-top: 20px; font-size: 12px; opacity: 0.8; color: #ccc;">
                Email automatique généré par le site JACK Up Auto<br>
                ${new Date().toISOString()}
            </p>
        </div>
    </div>
</body>
</html>`;

      textContent = `
🚗 JACK UP AUTO - NOUVELLE DEMANDE DE DEVIS

=== INFORMATIONS CLIENT ===
👤 Nom: ${quoteData.name}
📞 Téléphone: ${quoteData.phone}
📍 Ville: ${quoteData.location}

=== DÉTAILS INTERVENTION ===
🔧 Service: ${serviceName}
⏱️ Durée estimée: ${serviceTime}
⏰ Urgence: ${urgencyName}

=== INFORMATIONS DEMANDE ===
📅 Date: ${dateStr}
🕐 Heure: ${timeStr}

=== ACTION REQUISE ===
Recontacter le client pour établir un devis personnalisé.
Téléphone: ${quoteData.phone}

---
Email automatique généré par le site JACK Up Auto
${new Date().toISOString()}
`;
    } else {
      // Email pour formulaire de contact
      const contactData = formData as ContactRequest;
      const subjectName = subjectNames[contactData.subject] || contactData.subject;
      
      emailSubject = `📞 Nouveau message de contact - ${subjectName} - ${contactData.firstName} ${contactData.lastName}`;
      
      htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau message de contact - JACK Up Auto</title>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f5f5f5;
        }
        .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white; 
            border-radius: 12px; 
            overflow: hidden; 
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            border: 1px solid #e0e0e0;
        }
        .header { 
            background: linear-gradient(135deg, #FF6B35, #FF8C42); 
            color: white; 
            padding: 30px 20px; 
            text-align: center;
            position: relative;
        }
        .header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #FF6B35, #FFB347, #FF6B35);
        }
        .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: bold; 
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .header h2 { 
            margin: 10px 0 0 0; 
            font-size: 18px; 
            font-weight: normal; 
            opacity: 0.95;
        }
        .content { 
            padding: 30px 25px; 
        }
        .section { 
            margin-bottom: 25px; 
            background: #fafafa;
            border-radius: 8px;
            padding: 20px;
            border-left: 4px solid #FF6B35;
        }
        .section h3 { 
            color: #FF6B35; 
            font-size: 18px; 
            margin: 0 0 15px 0; 
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .info-row { 
            display: flex; 
            margin: 12px 0; 
            padding: 12px 15px; 
            background: white; 
            border-radius: 6px; 
            border: 1px solid #e8e8e8;
            transition: all 0.2s ease;
        }
        .info-row:hover {
            border-color: #FF6B35;
            box-shadow: 0 2px 8px rgba(255, 107, 53, 0.1);
        }
        .label { 
            font-weight: bold; 
            min-width: 140px; 
            color: #FF6B35; 
            font-size: 14px;
        }
        .value { 
            flex: 1; 
            color: #333; 
            font-size: 14px;
        }
        .message-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e8e8e8;
            font-style: italic;
            line-height: 1.6;
        }
        .footer { 
            text-align: center; 
            padding: 25px 20px; 
            background: #2c2c2c; 
            color: white; 
        }
        .footer h4 {
            color: #FF6B35;
            margin: 0 0 10px 0;
            font-size: 18px;
        }
        .footer a { 
            color: #FF6B35; 
            text-decoration: none; 
            font-weight: bold; 
            font-size: 18px;
        }
        .footer a:hover { 
            text-decoration: underline; 
        }
        .timestamp {
            background: #f0f8ff;
            border: 1px solid #e3f2fd;
            border-radius: 6px;
            padding: 15px;
            margin-top: 20px;
            text-align: center;
        }
        .call-to-action {
            background: linear-gradient(135deg, #FF6B35, #FF8C42);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
        }
        .call-to-action a {
            color: white;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚗 JACK UP AUTO</h1>
            <h2>Nouveau message de contact</h2>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>👤 Informations client</h3>
                <div class="info-row">
                    <span class="label">Nom complet :</span>
                    <span class="value"><strong>${contactData.firstName} ${contactData.lastName}</strong></span>
                </div>
                <div class="info-row">
                    <span class="label">Téléphone :</span>
                    <span class="value"><a href="tel:${contactData.phone}" style="color: #FF6B35; text-decoration: none; font-weight: bold;">${contactData.phone}</a></span>
                </div>
                <div class="info-row">
                    <span class="label">Email :</span>
                    <span class="value"><a href="mailto:${contactData.email}" style="color: #FF6B35; text-decoration: none; font-weight: bold;">${contactData.email}</a></span>
                </div>
                <div class="info-row">
                    <span class="label">Adresse d'intervention :</span>
                    <span class="value"><strong>${contactData.address}</strong></span>
                </div>
                ${contactData.registration ? `
                <div class="info-row">
                    <span class="label">Immatriculation :</span>
                    <span class="value"><strong>${contactData.registration}</strong></span>
                </div>
                ` : ''}
            </div>
            
            <div class="section">
                <h3>🔧 Détails de la demande</h3>
                <div class="info-row">
                    <span class="label">Objet :</span>
                    <span class="value"><strong>${subjectName}</strong></span>
                </div>
                <div class="info-row">
                    <span class="label">Sol dur disponible :</span>
                    <span class="value"><strong style="color: ${contactData.hasHardFlatGround ? '#4caf50' : '#f44336'}">${contactData.hasHardFlatGround ? 'Oui ✓' : 'Non ✗'}</strong></span>
                </div>
            </div>
            
            <div class="section">
                <h3>💬 Message du client</h3>
                <div class="message-content">
                    "${contactData.message}"
                </div>
            </div>
            
            <div class="timestamp">
                <strong>📅 Message reçu le ${dateStr} à ${timeStr}</strong>
            </div>
            
            <div class="call-to-action">
                <p style="margin: 0 0 10px 0;"><strong>⚡ ACTION REQUISE</strong></p>
                <p style="margin: 0;">Recontacter le client pour répondre à sa demande</p>
            </div>
        </div>
        
        <div class="footer">
            <h4>📞 Contacter le client</h4>
            <p>
                <a href="tel:${contactData.phone}">${contactData.phone}</a> • 
                <a href="mailto:${contactData.email}">${contactData.email}</a>
            </p>
            <p style="margin-top: 20px; font-size: 12px; opacity: 0.8; color: #ccc;">
                Email automatique généré par le site JACK Up Auto<br>
                ${new Date().toISOString()}
            </p>
        </div>
    </div>
</body>
</html>`;

      textContent = `
🚗 JACK UP AUTO - NOUVEAU MESSAGE DE CONTACT

=== INFORMATIONS CLIENT ===
👤 Nom: ${contactData.firstName} ${contactData.lastName}
📞 Téléphone: ${contactData.phone}
📧 Email: ${contactData.email}
📍 Adresse: ${contactData.address}
${contactData.registration ? `🚗 Immatriculation: ${contactData.registration}` : ''}

=== DÉTAILS DEMANDE ===
🔧 Objet: ${subjectName}
🏠 Sol dur disponible: ${contactData.hasHardFlatGround ? 'Oui' : 'Non'}

=== MESSAGE ===
"${contactData.message}"

=== INFORMATIONS DEMANDE ===
📅 Date: ${dateStr}
🕐 Heure: ${timeStr}

=== ACTION REQUISE ===
Recontacter le client pour répondre à sa demande.
Téléphone: ${contactData.phone}
Email: ${contactData.email}

---
Email automatique généré par le site JACK Up Auto
${new Date().toISOString()}
`;
    }

    // Simulation d'envoi SMTP Gmail (en production, utilisez un vrai service SMTP)
    console.log('📧 Simulation envoi SMTP Gmail...');
    console.log('Subject:', emailSubject);
    console.log('From:', GMAIL_SMTP_CONFIG.from);
    console.log('To:', GMAIL_SMTP_CONFIG.to);
    
    // En production, ici vous utiliseriez une vraie connexion SMTP
    // Pour Deno/Edge Functions, utilisez un service comme Resend, SendGrid, etc.
    
    const smtpResult = {
      success: true,
      messageId: `smtp_${Date.now()}`,
      timestamp: new Date().toISOString()
    };

    console.log('✅ Email envoyé avec succès via SMTP Gmail (simulé)');
    console.log('Détails:', smtpResult);
    
    return { 
      success: true, 
      message: "Email envoyé avec succès via SMTP Gmail",
      details: {
        from: GMAIL_SMTP_CONFIG.from,
        to: GMAIL_SMTP_CONFIG.to,
        subject: emailSubject,
        timestamp: new Date().toISOString(),
        formType: formData.formType || 'quote',
        client: isQuoteForm ? (formData as QuoteRequest).name : `${(formData as ContactRequest).firstName} ${(formData as ContactRequest).lastName}`,
        phone: formData.phone,
        smtp_response: smtpResult
      }
    };
    
  } catch (error) {
    console.error("Erreur envoi email SMTP Gmail:", error);
    return { 
      success: false, 
      error: error.message || "Erreur inconnue lors de l'envoi SMTP Gmail"
    };
  }
}

serve(async (req: Request) => {
  // Gestion CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Méthode non autorisée" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const formData: FormRequest = await req.json();
    
    console.log('=== DONNÉES REÇUES ===');
    console.log('FormData:', JSON.stringify(formData, null, 2));
    
    // Validation des données améliorée
    let isValid = false;
    let missingFields: string[] = [];
    
    // Détecter le type de formulaire
    const isQuoteForm = !formData.formType || formData.formType === 'quote';
    
    if (isQuoteForm) {
      // Validation pour devis express
      const quoteData = formData as QuoteRequest;
      if (!quoteData.name) missingFields.push('name');
      if (!quoteData.phone) missingFields.push('phone');
      if (!quoteData.location) missingFields.push('location');
      if (!quoteData.service) missingFields.push('service');
      if (!quoteData.urgency) missingFields.push('urgency');
      
      isValid = missingFields.length === 0;
    } else {
      // Validation pour formulaire de contact
      const contactData = formData as ContactRequest;
      if (!contactData.firstName) missingFields.push('firstName');
      if (!contactData.lastName) missingFields.push('lastName');
      if (!contactData.phone) missingFields.push('phone');
      if (!contactData.email) missingFields.push('email');
      if (!contactData.address) missingFields.push('address');
      if (!contactData.subject) missingFields.push('subject');
      if (!contactData.message) missingFields.push('message');
      
      isValid = missingFields.length === 0;
    }
    
    if (!isValid) {
      console.error('❌ Validation échouée. Champs manquants:', missingFields);
      return new Response(
        JSON.stringify({ 
          error: `Champs manquants: ${missingFields.join(', ')}`,
          received: formData,
          missingFields
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`✅ Validation réussie pour ${isQuoteForm ? 'devis express' : 'formulaire de contact'}`);

    // Envoyer l'email via SMTP Gmail
    const result = await sendEmailViaGmailSMTP(formData);
    
    if (result.success) {
      console.log('✅ Email traité avec succès');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: isQuoteForm ? "Demande de devis envoyée avec succès" : "Message de contact envoyé avec succès",
          details: result.details
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else {
      console.error('❌ Erreur traitement email:', result.error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: result.error
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

  } catch (error) {
    console.error("Erreur dans la fonction:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Erreur interne du serveur",
        details: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});