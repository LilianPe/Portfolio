"use client";

import Link from "next/link";
import { BackgroundLayers } from "@/components/home/BackgroundLayers";

export default function MentionsLegales() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden px-6 py-10 sm:py-14">
      <BackgroundLayers />
      <div className="relative w-full max-w-4xl mx-auto py-10 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
          >
            ← Retour à l'accueil
          </Link>
          <h1 className="text-4xl font-bold mb-2">Mentions Légales</h1>
          <p className="text-white/60">Informations légales concernant ce site</p>
        </div>

        <div className="space-y-12">
          {/* Éditeur du site */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Éditeur du site</h2>
            <div className="space-y-2 text-white/80">
              <p><strong>Nom :</strong> Lilian Perthuis</p>
              <p><strong>Statut :</strong> Micro-entrepreneur</p>
              <p><strong>SIRET :</strong> 10403505000012</p>
              <p><strong>Adresse :</strong> 12 Rue de la Brie, 91940 Les Ulis</p>
              <p><strong>Email :</strong> lilianperthuis@gmail.com</p>
              <p><strong>Secteur :</strong> Développement informatique et conseil en technologies</p>
            </div>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Hébergement</h2>
            <div className="space-y-2 text-white/80">
              <p><strong>Hébergeur :</strong> Vercel Inc.</p>
              <p><strong>Site :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">vercel.com</a></p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Propriété intellectuelle</h2>
            <p className="text-white/80 mb-4">
              L'ensemble du contenu de ce site (textes, images, graphiques, logos, etc.) est protégé par les lois sur la propriété intellectuelle.
            </p>
            <p className="text-white/80">
              Toute reproduction, adaptation ou exploitation non autorisée est interdite. Les contenus et projets présentés sur ce site sont, sauf mention contraire, la propriété de Lilian Perthuis ou ont été réalisés dans le cadre de missions clients, de collaborations ou de projets académiques. Ils sont présentés à titre de portfolio.
            </p>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Limitation de responsabilité</h2>
            <p className="text-white/80 mb-4">
              Ce site est fourni à titre informatif. Bien que nous nous efforcions d'assurer l'exactitude des informations présentes, aucune garantie n'est donnée quant à leur précision.
            </p>
            <p className="text-white/80">
              L'éditeur ne saurait être responsable des dommages directs ou indirects résultant de l'accès, de l'utilisation ou de l'impossibilité d'accès à ce site.
            </p>
          </section>

          {/* Données personnelles */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Données personnelles</h2>
            <p className="text-white/80 mb-4">
              Ce site peut collecter des données personnelles minimales (adresse email pour les demandes de contact). Ces données sont utilisées exclusivement pour traiter votre demande et ne sont jamais partagées avec des tiers.
            </p>
            <p className="text-white/80">
              Conformément à la RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour toute demande, contactez : lilianperthuis@gmail.com
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Cookies et analytics</h2>
            <p className="text-white/80">
              Ce site utilise Vercel Analytics pour analyser le trafic et améliorer l'expérience utilisateur. Aucun cookie de suivi tiers n'est utilisé. Vous pouvez consulter la <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">politique de confidentialité de Vercel</a> pour plus d'informations.
            </p>
          </section>

          {/* Liens externes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Liens externes</h2>
            <p className="text-white/80">
              Ce site contient des liens vers des sites externes. L'éditeur n'est pas responsable du contenu de ces sites externes et recommande de consulter leurs conditions d'utilisation respectives.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Contact</h2>
            <p className="text-white/80 mb-4">
              Pour toute question relative à ces mentions légales ou au site :
            </p>
            <p className="text-white/80">
              <strong>Email :</strong> lilianperthuis@gmail.com
            </p>
          </section>

          {/* Dernière mise à jour */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-sm text-white/40">
              Dernière mise à jour : 8 mai 2026
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
